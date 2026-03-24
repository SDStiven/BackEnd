import db from "../lib/db.js";
import type { ServicoMySqlType } from "../Utils/types.js";
 
// Funções do modelo de servico
export const servicoModel = {
    // create servico
    async create(newServico: ServicoMySqlType) {
        try {
            const query = `insert into tbl_servicos values(?,?,?,?,?,?,?)`
            const values = [
                null,
                newServico.nome,
                newServico.descricao,
                newServico.categoria,
                newServico.enabled,
                new Date(),
                new Date()
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },
 
    // get all services
    async getAll() {
        try {
            const servicos = `select * from tbl_servicos`

            const rows = await db.execute(servicos)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },

    // get one service by id
    async get(id: string) {
        try {
            const servico = `select * from tbl_servicos where id = ?`
            const values = [id]
            const rows = await db.execute(servico, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },

    // update service
    async update(id: string, ServicoAtualizado: ServicoMySqlType) {
        try {
            const updateServico = `update tbl_servicos 
            set nome = ?, 
            descricao = ?, 
            categoria = ?, 
            enabled = ?, 
            apdate_at = ? 
            where id = ?`
            const values = [
                ServicoAtualizado.nome,
                ServicoAtualizado.descricao,
                ServicoAtualizado.categoria,
                ServicoAtualizado.enabled,
                new Date(),
                id
            ]
            const rows = await db.execute(updateServico, values)
            return rows
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },

    // delete service
    async delete(id: string) {
        try {
            // query = deletar um servico
            const query = `delete from tbl_servicos where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            
            return rows
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },


}
