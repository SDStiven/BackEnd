import db from "../lib/db.js"
import type { PropostaMySqlType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"


export const propostaModel = {
    // create proposta
    async create(newProposta: PropostaMySqlType) {
        try {
            const query = `insert into tbl_propostas values(?,?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                newProposta.id_prestacao,
                newProposta.preco_hora,
                newProposta.preco_estimado,
                newProposta.estado,
                newProposta.anable,
                new Date(),
                new Date()
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // get all proposals
    async getAll() {
        try {
            const query = `select * from tbl_propostas`
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // get one proposal by id
    async get(id: string) {
        try {
            const query = `select * from tbl_propostas where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // update proposal
    async update(id: string, propostaAtualizada: PropostaMySqlType) {
        try {
            const query = `update tbl_propostas set id_prestacao = ?, preco_hora = ?, preco_estimado = ?, estado = ?, anable = ?, apdate_at = ? where id = ?`
            const values = [
                propostaAtualizada.id_prestacao,
                propostaAtualizada.preco_hora,
                propostaAtualizada.preco_estimado,
                propostaAtualizada.estado,
                propostaAtualizada.anable,
                new Date(),
                id
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    },
    // delete proposal
    async delete(id: string) {
        try {
            const query = `delete from tbl_propostas where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch proposta.ts": error })
            return null
        }
    }
}