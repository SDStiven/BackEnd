import type { PoolConnection, RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { PropostaDBType, Prestacao_servicoDBType, PrestadorDBType, UtilizadorDBType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"

type AceitarPropostaResult =
    | { success: true;  propostaAceite: PropostaDBType; prestacao: Prestacao_servicoDBType | null; prestadorAceite: PrestadorDBType | null; propostasRejeitadas: any[] }
    | { success: false; message: string }


export const propostaModel = {
    // create proposta
    async create(newProposta: PropostaDBType): Promise<PropostaDBType | null> {
        try {
            const query = `insert into tbl_proposta values(?,?,?,?,?,?,?,?)`
            const values = [
                null,
                newProposta.id_prestacao,
                newProposta.preco_hora,
                newProposta.hora_estimada,
                newProposta.estado,
                newProposta.anable,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(query, values)
            return rows as PropostaDBType
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // get all proposals
    async getAll(): Promise<PropostaDBType[] | null> {
        try {
            const query = `select * from tbl_proposta`
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows : []
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // get one proposal by id
    async get(id: string): Promise<PropostaDBType | null> {
        try {
            const query = `select * from tbl_proposta where tbl_proposta.id = ?`
            const values = [id]
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as PropostaDBType : null
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // update proposal
    async update(id: string, propostaAtualizada: PropostaDBType): Promise<PropostaDBType | null> {
        console.log("propostaAtualizada",propostaAtualizada)
        console.log("id",id)
        try {
            const query = `update tbl_proposta set id_prestacao = ?, preco_hora = ?, hora_estimada = ?, estado = ?, anable = ?, apdate_at = ? where tbl_proposta.id = ?`
            const values = [
                propostaAtualizada.id_prestacao,
                propostaAtualizada.preco_hora,
                propostaAtualizada.hora_estimada,
                propostaAtualizada.estado,
                propostaAtualizada.anable,
                new Date(),
                id
            ]
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(query, values)
            console.log("rows",rows)
            return rows as PropostaDBType
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // delete proposal
    async delete(id: string): Promise<PropostaDBType | null> {
        try {
            const query = `delete from tbl_proposta where id = ?`
            const values = [id]
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(query, values)
            return rows as PropostaDBType
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },

    /**
     * Aceitar uma proposta — executa tudo dentro de uma transação MySQL:
     *  1. Atualiza a proposta escolhida para estado = 'Aceite'
     *  2. Atualiza a prestação de serviço correspondente para estado = 'Em execução'
     *  3. Rejeita todas as outras propostas do mesmo id_prestacao para estado = 'Rejeitada'
     *  4. Retorna dados para disparo de notificações
     */
    async aceitarProposta(propostaId: string): Promise<AceitarPropostaResult> {
        const conn: PoolConnection = await db.getConnection()
        try {
            await conn.beginTransaction()

            // 1. Buscar a proposta selecionada
            const [propostaRows] = await conn.execute<PropostaDBType[] & RowDataPacket[]>(
                `select * from tbl_proposta where id = ?`,
                [propostaId]
            )
            const propostas = (Array.isArray(propostaRows) ? propostaRows : []) as PropostaDBType[]
            if (propostas.length === 0) {
                await conn.rollback()
                conn.release()
                return { success: false, message: "Proposta não encontrada" }
            }
            const proposta = propostas[0]!

            // 2. Marcar a proposta como 'Aceite'
            await conn.execute(
                `update tbl_proposta set estado = 'Aceite', updated_at = ? where id = ?`,
                [new Date(), propostaId]
            )

            // 3. Buscar a prestação de serviço relacionada
            const [prestacaoRows] = await conn.execute<Prestacao_servicoDBType[] & RowDataPacket[]>(
                `select * from tbl_prestacao_servico where id = ?`,
                [proposta.id_prestacao]
            )
            const prestacoes = (Array.isArray(prestacaoRows) ? prestacaoRows : []) as Prestacao_servicoDBType[]
            const prestacao = prestacoes[0] ?? null

            if (prestacao) {
                // 4. Atualizar a prestação para 'Em execução'
                await conn.execute(
                    `update tbl_prestacao_servico set estado = 'Em execução', updated_at = ? where id = ?`,
                    [new Date(), prestacao.id]
                )
            }

            // 5. Rejeitar as outras propostas do mesmo id_prestacao
            await conn.execute(
                `update tbl_proposta set estado = 'Rejeitada', updated_at = ? 
                 where id_prestacao = ? and id != ? and estado != 'Aceite'`,
                [new Date(), proposta.id_prestacao, propostaId]
            )

            // 6. Buscar todas as propostas rejeitadas (para notificações)
            const [rejeitadasRows] = await conn.execute<any[] & RowDataPacket[]>(
                `select p.*, pr.nome as prestador_nome, pr.id as prestador_id
                 from tbl_proposta p
                 left join tbl_prestadores pr on pr.id = p.id_prestacao
                 where p.id_prestacao = ? and p.id != ? and p.estado = 'Rejeitada'`,
                [proposta.id_prestacao, propostaId]
            )

            // 7. Buscar dados do prestador da proposta aceite
            let prestadorAceite: any = null
            if (prestacao?.id_prestador) {
                const [prestadorRows] = await conn.execute<PrestadorDBType[] & RowDataPacket[]>(
                    `select * from tbl_prestadores where id = ?`,
                    [prestacao.id_prestador]
                )
                const prestadores = (Array.isArray(prestadorRows) ? prestadorRows : []) as PrestadorDBType[]
                prestadorAceite = prestadores[0] ?? null
            }

            await conn.commit()
            conn.release()

            return {
                success: true,
                propostaAceite: proposta,
                prestacao,
                prestadorAceite,
                propostasRejeitadas: Array.isArray(rejeitadasRows) ? rejeitadasRows : []
            }
        } catch (error) {
            await conn.rollback()
            conn.release()
            console.error({ "catch aceitarProposta": error })
            return { success: false, message: "Erro interno na transação" }
        }
    }
}