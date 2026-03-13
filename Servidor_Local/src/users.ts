import db from "./lib/db.js"
import type { utilizadorMySqlType } from "./Utils/types.js"

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

export function novoUtilizador(utilizador: utilizadorMySqlType) {
    console.log({"utilizador users.ts":utilizador})
    try {
    const user =  db.execute(`
        insert into tbl_utilizadores
        values(
        ?,?,?,?,?,?,?,?,?,?,?,?)
        `,
        [
            utilizador.id,
            utilizador.nome,
            utilizador.numero_identificacao,
            utilizador.data_nascemento,
            utilizador.email,
            utilizador.telefone,
            utilizador.pais,
            utilizador.localidade,
            utilizador.password,
            utilizador.enabled,
            utilizador.created_at,
            utilizador.update_at
        ]
    )
    if (Array.isArray(user) && user.length === 0) return null
    return user
}catch(error){
    console.log({"catch users.ts":error})
    return null
}
}
