import db from "../lib/db.js"
import type { PrestadorDBType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"


export const prestadorModel = {
    // create prestador
    async create(Prestador: PrestadorDBType) {
        try {
            const newPrestador = `insert into tbl_prestadores values(?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                Prestador.nome,
                Prestador.profissao,
                Prestador.taxa_urgencia,
                Prestador.minimo_desconto,
                Prestador.nif,
                Prestador.persentagem_desconto,
                Prestador.preco_hora,
                Prestador.disponivel
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
            const prestadores = `select * from tbl_prestadores`
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
            const prestador = `select * from tbl_prestadores where tbl_prestadores.id = ?`
            const rows = await db.execute(prestador, [id])
            console.log("rows", rows)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },

    // update prestador
    async update(id: string, apdatePrestador: PrestadorDBType) {
        try {
            const updatePrestador = `update tbl_prestadores set nome = ?,
             profissao = ?,
              taxa_urgencia = ?, 
              minimo_desconto = ?, 
              nif = ?, 
              persentagem_desconto = ?, 
              preco_hora = ?, 
              disponivel = ? where id = ?`
            const values = [
                apdatePrestador.nome,
                apdatePrestador.profissao,
                apdatePrestador.taxa_urgencia,
                apdatePrestador.minimo_desconto,
                apdatePrestador.nif,
                apdatePrestador.persentagem_desconto,
                apdatePrestador.preco_hora,
                apdatePrestador.disponivel,
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
            const query = `delete from tbl_prestadores where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestador.ts": error })
            return null
        }
    },
}



