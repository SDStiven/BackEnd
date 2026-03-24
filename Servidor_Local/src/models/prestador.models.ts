import db from "../lib/db.js"
import type { PrestadorMySqlType } from "../Utils/types.js"


export const prestadorModel = {
    // create prestador
    async create(Prestador: PrestadorMySqlType) {
        try {
            const newPrestador = `insert into tbl_prestador values(?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                null, 
                Prestador.nome,
                Prestador.profissao,
                Prestador.taxa_urgencia,
                Prestador.minimo_desconto,
                Prestador.nif,
                Prestador.persentagem_desconto,
                Prestador.preco_hora,
                Prestador.disponivel,
                new Date(),
                new Date()
            ]
            const rows = await db.execute(newPrestador, values)
            return rows
        } catch (error) {
            console.log({ "catch prestador-modules.ts": error })
            return null
        }
    },

    // getAll prestadores
    async getAll() {
        try {
            const prestadores = `select * from tbl_prestador`
            const rows = await db.execute(prestadores)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },

    // get one prestador by id
    async get(id: string) {
        try {
            const prestador = `select * from tbl_prestador where id = ?`
            const values = [id]
            const rows = await db.execute(prestador, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },

    // update prestador
    async update(id: string, apdatePrestador: PrestadorMySqlType) {
        try {
            const updatePrestador = `update tbl_prestador 
           ?, 
           ?, 
           ?, 
           ?, 
           ?, 
           ?, 
           ?, 
           ?,  
           ?, 
           ?, 
           ?` 
            const values = [
                apdatePrestador.nome,
                apdatePrestador.profissao,
                apdatePrestador.taxa_urgencia,
                apdatePrestador.minimo_desconto,
                apdatePrestador.nif,
                apdatePrestador.persentagem_desconto,
                apdatePrestador.preco_hora,
                apdatePrestador.disponivel,
                new Date(),
                id
            ]
            const rows = await db.execute(updatePrestador, values)
            return rows
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },

    // delete prestador
    async delete(id: string) {
        try {
            const query = `delete from tbl_prestador where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },
}



