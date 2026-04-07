import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../Utils/date.js"
import { hashPassword } from "../Utils/password.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"




export const userModel = {
    // create user
    async create(user: utilizadorMySqlType) {
        console.log("user user.models.ts",user)
        try {
            const query = `insert into tbl_utilizadores values(?,?,?,?,?,?,?,?,?,?,?,?)`
            console.log("query user.models.ts",query)
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
            console.log("values user.models.ts",values)

            const rows = await db.execute(query, values)
            console.log("rows user.models.ts",rows)
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
            const user = `select * from tbl_utilizadores where tbl_utilizadores.id = ?`
            const values = [id]
            const [rows] = await db.execute(user, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as utilizadorMySqlType : null
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
            update_at = ? where id = ?`
            const values = [ 
                userupdate.nome,
                userupdate.numero_identificacao,
                formatDateDDMMYYYY(userupdate.data_nascemento),
                userupdate.email,
                userupdate.telefone,
                userupdate.pais,
                userupdate.localidade,
                await hashPassword(userupdate.password),
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
    // login
    async getByEmail(email: string): Promise<utilizadorMySqlType | null> {
        try {
            const query = `select * from tbl_utilizadores where tbl_utilizadores.email = ?`
            const values = [email]
            const[ rows ]= await db.execute(query, values)
            if(Array.isArray(rows) && rows.length === 0)return null
            return Array.isArray(rows) ? rows[0] as utilizadorMySqlType : null
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
    // update password
    async updatePassword(id: string, newPasswordHash: string) {
        try {
            const query = `update tbl_utilizadores set password = ? where id = ?`
            const values = [newPasswordHash, id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    }
}