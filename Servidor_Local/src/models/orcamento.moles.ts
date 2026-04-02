import db from "../lib/db.js"
import type { OrcamentoMySqlType } from "../Utils/types.js"


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
//     ## 2. O Motor Lógico (Cálculo de Orçamento)

// - Calcular Total (PUT /orcamento/:id/calcular):
//   - O endpoint deve ir à base de dados
//   - consolidar os valores da tbl_prestacao_servico
//     - cruzando preco_hora com horas_estimadas
//   - aplicar as regras de negócio de taxa_urgencia ou descontos da tbl_prestadores
//   - gravar o valor absoluto na coluna total da tbl_orcamento.
  async calcularTotal(id: string) { 
    try { 
      const query = `select * from tbl_orcamentos where id = ?`
      const values = [id]
      const rows = await db.execute(query, values)
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } catch (error) {
      console.log({ "catch Orcamento.ts": error })
      return null
    }
  }
}