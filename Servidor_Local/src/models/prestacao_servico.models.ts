import db from "../lib/db.js"
import type { Prestacao_servicoType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"


export const prestacao_servicoModel = { 
    // create prestacao_servico
     async create(novo: Prestacao_servicoType) {
        try {
            const query = `insert into tbl_prestacao_servico values(?,?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                novo.disignacao,
                novo.subtotal,
                novo.haras_estimadas,
                novo.id_prestador,
                novo.id_servico,
                novo.preco_hora,
                novo.estado,
                novo.id_orcamento,
                novo.enabled,
                new Date(),
                new Date(),
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get all prestacao_servico
    async getAll() {
        try {
            const query = `select * from tbl_prestacao_servico`
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get one prestacao_servico by id
    async get(id: string) {
        try {
            const query = `select * from tbl_prestacao_servico where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // update prestacao_servico
    async update(id: string, prestacao_servicoAtualizado: Prestacao_servicoType) {
        try {
            const query = `update tbl_prestacao_servico set disignacao = ?, subtotal = ?, haras_estimadas = ?, id_prestador = ?, id_servico = ?, preco_hora = ?, estado = ?, id_orcamento = ?, enabled = ?, created_at = ?, updated_at = ?, preco_hora = ? where id = ?`
            const values = [
                prestacao_servicoAtualizado.disignacao,
                prestacao_servicoAtualizado.subtotal,
                prestacao_servicoAtualizado.haras_estimadas,
                prestacao_servicoAtualizado.id_prestador,
                prestacao_servicoAtualizado.id_servico,
                prestacao_servicoAtualizado.preco_hora,
                prestacao_servicoAtualizado.estado,
                prestacao_servicoAtualizado.id_orcamento,
                prestacao_servicoAtualizado.enabled,
                new Date(),
                prestacao_servicoAtualizado.preco_hora,
                id
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // delete prestacao_servico
    async delete(id: string) {
        try {
            const query = `delete from tbl_prestacao_servico where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
}
