import db from "../lib/db.js"
import type { EmpresaDBType } from "../Utils/types.js"
import type { RowDataPacket } from "mysql2/promise"
import { generateUUID } from "../Utils/uuid.js"

const empresaModel = {
    async create(empresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const query = `insert into tblempresa values(?,?,?,?,?,?,?,?,?,?)`
            const values = [
                null,
                empresa.designacao,
                empresa.descricao,
                empresa.localizacao,
                empresa.nif,
                empresa.icone,
                empresa.id_utilizador,
                empresa.enabled ,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values)
            return rows as EmpresaDBType
        } catch (error) {
            console.log({ "catch empresa.model.ts": error })
            return null
        }
    },
    async getAll(): Promise<EmpresaDBType[] | null> {
        try {
            const query = `select * from tblempresa`
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows : []
        } catch (error) {
            console.log({ "catch empresa.model.ts": error })
            return null
        }
    },
    async get(id: string): Promise<EmpresaDBType | null> {
        try {
            const query = `select * from tblempresa where id = ?`
            const values = [id]
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as EmpresaDBType : null
        } catch (error) {
            console.log({ "catch empresa.model.ts": error })
            return null
        }
    },
    async update(id: string, empresaAtualizada: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const query = `update tblempresa set designacao = ?, descricao = ?, nif = ?, icone = ?, id_utilizador = ?, localizacao = ?, enabled = ?, updated_at = ? where id = ?`
            const values = [
                empresaAtualizada.designacao,
                empresaAtualizada.descricao,
                empresaAtualizada.nif,
                empresaAtualizada.icone,
                empresaAtualizada.id_utilizador,
                empresaAtualizada.localizacao,
                empresaAtualizada.enabled,
                new Date(),
                id
            ]
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values)
            return rows as EmpresaDBType
        } catch (error) {
            console.log({ "catch empresa.model.ts": error })
            return null
        }
    },
    async delete(id: string): Promise<EmpresaDBType | null> {
        try {
            const query = `delete from tblempresa where id = ?`
            const values = [id]
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values)
            return rows as EmpresaDBType
        } catch (error) {
            console.log({ "catch empresa.model.ts": error })
            return null
        }
    }
}
export { empresaModel }
