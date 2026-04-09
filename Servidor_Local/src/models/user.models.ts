import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../Utils/date.js"
import { hashPassword } from "../Utils/password.js"
import type { UtilizadorDBType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"




export const userModel = {
    // create user
    async create(user: UtilizadorDBType) {
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
            const rows = await db.execute(`select * from tbl_utilizadores`)
            return rows
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

     // get user by id
    async get(id: string): Promise<UtilizadorDBType | null> {
        try {
            const [rows] = await db.execute(
                `select * from tbl_utilizadores where tbl_utilizadores.id = ?`, [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UtilizadorDBType : null
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

      // update serv
    async update(id: string, userupdate: UtilizadorDBType) {
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
    async getByEmail(email: string): Promise<UtilizadorDBType | null> {
        try {
            const [rows] = await db.execute(
                `select * from tbl_utilizadores where tbl_utilizadores.email = ?`, [email]

            )

            if(Array.isArray(rows) && rows.length === 0)return null
            return Array.isArray(rows) ? rows[0] as UtilizadorDBType : null
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
            const [rows] = await db.execute(
                `update tbl_utilizadores set password = ?, update_at = ? where id = ?`,
                [
                    newPasswordHash,
                    new Date(),
                    id
                ]
            )
            return rows
        } catch (error) {
            console.log({ "catch user.models.ts": error })
            return null
        }
    },

    // reset password
    async resetPassword(id: string, password: string) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_utilizadores 
                SET password = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    await hashPassword(password),
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },
}