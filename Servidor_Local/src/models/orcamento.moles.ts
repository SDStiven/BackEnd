import db from "../lib/db.js"
import type { OrcamentoMySqlType, Prestacao_servicoType, PrestadorMySqlType } from "../Utils/types.js"


export const orcamentoModel = {
    // create orcamento
    async create(newOrcamento: OrcamentoMySqlType) {
        try {
            const query = `insert into tbl_orcamentos values(?,?,?,?,?,?,?,?)`
            const values = [
                null,
                newOrcamento.total,
                newOrcamento.id_utilizador,
                newOrcamento.enable,
                new Date(),
                new Date()
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // get all orcamentos
    async getAll() {
        try {
            const orcamentos = `select * from tbl_orcamentos`

            const rows = await db.execute(orcamentos)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // get one orcamento by id
    async get(id: string) {
        try {
            const orcamento = `select * from tbl_orcamentos where id = ?`
            const values = [id]
            const rows = await db.execute(orcamento, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // update orcamento
    async update(id: string, orcamentoAtualizado: OrcamentoMySqlType) {
        try {
            const updateOrcamento = `update tbl_orcamentos 
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
            const rows = await db.execute(updateOrcamento, values)
            return rows
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // delete orcamento
    async delete(id: string) {
        try {
            const query = `delete from tbl_orcamentos where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch Orcamento.ts": error })
            return null
        }
    },
    // Calcular Total (PUT /orcamento/:id/calcular)
    async calcularTotal(id: string): Promise<{ total: number } | null> {
        try {
            // 1. Verificar se o orçamento existe
            const [orcRows] = await db.execute(
                `select * from tbl_orcamentos where id = ?`,
                [id]
            )
            if (!Array.isArray(orcRows) || orcRows.length === 0) return null

            // 2. Buscar todos os serviços (prestações) ligados a este orçamento
            const [servicoRows] = await db.execute(
                `select * from tbl_prestacao_servico where id_orcamento = ? and enabled = 1`,
                [id]
            )
            const servicos = (Array.isArray(servicoRows) ? servicoRows : []) as Prestacao_servicoType[]

            if (servicos.length === 0) {
                // Nenhum serviço — total é 0
                await db.execute(
                    `update tbl_orcamentos set total = 0, updated_at = ? where id = ?`,
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
                    const prestadores = (Array.isArray(prestRows) ? prestRows : []) as PrestadorMySqlType[]
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
                `update tbl_orcamentos set total = ?, updated_at = ? where id = ?`,
                [totalAbsoluto, new Date(), id]
            )

            return { total: totalAbsoluto }
        } catch (error) {
            console.log({ "catch calcularTotal Orcamento.ts": error })
            return null
        }
    }
}