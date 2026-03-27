import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../Utils/date.js"
import { hashPassword } from "../Utils/password.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"




export const userModel = {
    // create user
    async create(user: utilizadorMySqlType) {
         console.log(user)
        try {
            const query = `insert into tbl_utilizadores values(?,?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                user.nome,
                user.numero_identificacao,
                formatDateDDMMYYYY(user.data_nascemento),
                user.email,
                user.telefone,
                user.pais,
                user.localidade,
                await hashPassword(user.password),
                user.enabled,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
       
    },

    // get all users
    async getAll() {
        try {
            const user = `select * from tbl_utilizadores`

            const rows = await db.execute(user)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

     // get user by id
    async get(id: string) {
        try {
            const user = `select * from tbl_utilizadores where id = ?`
            const values = [id]
            const rows = await db.execute(user, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

      // update service
    async update(id: string, userupdate: utilizadorMySqlType) {
        try {
            const updateServico = `update tbl_utilizadores 
            set nome = ?, 
            numero_identificacao = ?, 
            data_nascemento = ?, 
            email = ?, 
            telefone = ?, 
            pais = ?, 
            localidade = ?, 
            password = ?, 
            enabled = ?, 
            create_at = ?, 
            apdate_at = ? 
            where id = ?`
            const values = [
                userupdate.nome,
                userupdate.numero_identificacao,
                userupdate.data_nascemento,
                userupdate.email,
                userupdate.telefone,
                userupdate.pais,
                userupdate.localidade,
                userupdate.password,
                userupdate.enabled,
                new Date(),
                id
            ]
            const rows = await db.execute(updateServico, values)
            return rows
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

    // delete user
    async delete(id: string) {
        try {
            const query = `delete from tbl_utilizadores where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    }, 
}