import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../Utils/date.js"
import { hashPassword } from "../Utils/password.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"

export async function getUser() {
    const [rows] = await db.execute(`select * from tbl_utilizadores`)
    return rows
}

export async function getUseById(id: string) {
    const [rows] = await db.execute(`SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?`,
        [id]
    )
    if (Array.isArray(rows) && rows.length === 0) return null

    return Array.isArray(rows) ? rows[0] : null

}

// Inserir um novo utilizador mysql
export async function novoUtilizador(utilizador: utilizadorMySqlType) {
    try {
        const user = db.execute(`
        insert into tbl_utilizadores
        values(
        ?,?,?,?,?,?,?,?,?,?,?,?)
        `,
            [
                generateUUID(),
                utilizador.nome,
                utilizador.numero_identificacao,
                formatDateDDMMYYYY(utilizador.data_nascemento),
                utilizador.email,
                utilizador.telefone,
                utilizador.pais,
                utilizador.localidade,
                await hashPassword(utilizador.password),
                utilizador.enabled,
                new Date(),
                new Date()
            ]
        )
        if (Array.isArray(user) && user.length === 0) return null
        return user
    } catch (error) {
        console.log({ "catch users.ts": error })
        return null
    }
}

export async function deleteUser(id: string) {
    const [rows] = await db.execute(`DELETE FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?`,
        [id]
    )
    return rows
}