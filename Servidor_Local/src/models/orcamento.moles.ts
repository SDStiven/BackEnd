import db from "../lib/db.js"
import type { OrcamentoDBType, Prestacao_servicoDBType, PrestadorDBType, PropostaDBType } from "../Utils/types.js"
import type { RowDataPacket } from "mysql2"


export const orcamentoModel = {
    // create orcamento
    async create(newOrcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const query = `insert into tbl_orcamento values(?,?,?,?,?,?)`
            const values = [
                newOrcamento.total,
                newOrcamento.id_utilizador,
                newOrcamento.enable,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, values)
            return rows as OrcamentoDBType
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // get all orcamentos
    async getAll(): Promise<OrcamentoDBType[] | null> {
        try {
            const orcamentos = `select * from tbl_orcamento`

            const rows = await db.execute<OrcamentoDBType & RowDataPacket[]>(orcamentos)

            return Array.isArray(rows) && rows.length > 0 ? rows as OrcamentoDBType[] : []
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // get one orcamento by id
    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const orcamento = `select * from tbl_orcamento where id = ?`
            const values = [id]
            const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(orcamento, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as OrcamentoDBType : null
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // update orcamento
    async update(id: string, orcamentoAtualizado: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const updateOrcamento = `update tbl_orcamento 
            set id_prestacao = ?, 
            preco_hora = ?, 
            preco_estimado = ?, 
            estado = ?, 
            anable = ?, 
            apdate_at = ? 
            where id = ?`
            const values = [
                orcamentoAtualizado.total,
                orcamentoAtualizado.id_utilizador,
                orcamentoAtualizado.enable,
                new Date(),
                id
            ]
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(updateOrcamento, values)
            return rows as OrcamentoDBType
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // delete orcamento
    async delete(id: string): Promise<OrcamentoDBType | null> {
        try {
            const query = `delete from tbl_orcamento where id = ?`
            const values = [id]
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, values)
            return rows as OrcamentoDBType
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // Calcular Total (PUT /orcamento/:id/calcular)
    async calcularTotal(id: string): Promise<OrcamentoDBType | { total: number } | null> {
        try {
            // 1. Verificar se o orçamento existe
            const [orcRows] = await db.execute(
                `select * from tbl_orcamento where id = ?`,
                [id]
            )
            if (!Array.isArray(orcRows) || orcRows.length === 0) return null

            // 2. Buscar todos os serviços (prestações) ligados a este orçamento
            const [servicoRows] = await db.execute(
                `select * from tbl_prestacao_servico where id_orcamento = ? and enabled = 1`,
                [id]
            )
            const servicos = (Array.isArray(servicoRows) ? servicoRows : []) as Prestacao_servicoDBType[]

            if (servicos.length === 0) {
                // Nenhum serviço — total é 0
                await db.execute(
                    `update tbl_orcamento set total = 0, updated_at = ? where id = ?`,
                    [new Date(), id]
                )
                return { total: 0 }
            }

            let totalGeral = 0

            for (const servico of servicos) {
                // 3a. Subtotal base: preco_hora * horas_estimadas
                const subtotalBase = Number(servico.preco_hora) * Number(servico.haras_estimadas)

                let subtotalFinal = subtotalBase

                // 3b. Buscar dados do prestador para aplicar regras de negócio
                if (servico.id_prestador) {
                    const [prestRows] = await db.execute(
                        `select * from tbl_prestadores where id = ?`,
                        [servico.id_prestador]
                    )
                    const prestadores = (Array.isArray(prestRows) ? prestRows : []) as PrestadorDBType[]
                    const prestador = prestadores[0]

                    if (prestador) {
                        // Aplicar taxa de urgência (se o serviço estiver marcado como urgente)
                        // O campo 'estado' é usado como flag de urgência quando = 'urgente'
                        const urgente = String(servico.estado).toLowerCase() === 'urgente'
                        if (urgente && Number(prestador.taxa_urgencia) > 0) {
                            const taxaDecimal = Number(prestador.taxa_urgencia) / 100
                            subtotalFinal += subtotalBase * taxaDecimal
                        }

                        // Aplicar desconto do prestador (se subtotal atingir o mínimo)
                        if (subtotalFinal >= Number(prestador.minimo_desconto)
                            && Number(prestador.persentagem_desconto) > 0) {
                            const descontoDecimal = Number(prestador.persentagem_desconto) / 100
                            subtotalFinal -= subtotalFinal * descontoDecimal
                        }
                    }
                }

                // 3c. Atualizar o subtotal calculado na própria prestação de serviço
                await db.execute(
                    `update tbl_prestacao_servico set subtotal = ?, updated_at = ? where id = ?`,
                    [subtotalFinal, new Date(), servico.id]
                )

                totalGeral += subtotalFinal
            }

            // 4. Gravar o total absoluto no orçamento
            const totalAbsoluto = Math.abs(totalGeral)
            await db.execute(
                `update tbl_orcamento set total = ?, updated_at = ? where id = ?`,
                [totalAbsoluto, new Date(), id]
            )

            return { total: totalAbsoluto }
        } catch (error) {
            console.log({ "catch calcularTotal Orcamento.ts": error })
            return null
        }
    },
}
/*
    // calcular total formador
    async calculatebudget(req: Request, res: Response) {
        try {
            const { id } = req.params
            // logit based  on the fallowing
            // accepte proposal bring id_prestador which has urgente tax ,for discount  and discont percentage  acording to types
            // proposal and precHora and horas_estimada 

            // the calculator buget
            const Prestacaoservico = await PretacaoServicoModel.getbuidorcamento(id as string)
            if (!Prestacaoservico) {
                return res.status(404).json(
                    {
                        status: 404,
                        message: "Nenhum prestador encontrado"
                    data: null
                    })
            }
            // fectch all proposal
            const proposals = await PretacaoServicoModel.getbaiIdprestacaosevico(Prestacaoservico.id as string)
            if (!proposals) {
                return res.status(404).json(
                    {
                        status: 404,
                        message: "Nenhum prestador encontrado"
                    data: null
                    })
            }
            // find accepted proposal
            const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)
            if (!acceptedProposal) {
                return res.status(404).json(
                    {
                        status: "error",
                        message: "ainda não foi aceite nenhuma proposta"
                    data: null
                    })
            }
            const precHora = acceptedProposal.preco_hora
            const horasEstimadas = acceptedProposal.haras_estimadas

            // fectch pretador to get urgent t ax minimun disount  and discount percentage based okn  attts in utils/type.ts
            const prestador = await PrestadorModel.get(acceptedProposal.id_prestador)
            if (!prestador) {
                return res.status(404).json(
                    {
                        status: 404,
                        message: "Nenhum prestador encontrado"
                        data: null
                    })
            }
            const urgentetax = prestador.taxa_urgencia
            const minimunDiscount = prestador.minimo_desconto
            const discountPercentage = prestador.persentagem_desconto

            // calcule the budget on utils/type.ts
        





        }catch(error){
            console.log(error)
            return res.status(500).json(
                {
                    status: 500,
                    message: "Erro ao calcular o orçamento"
                data: null
                })
        }
    }
}
*/
