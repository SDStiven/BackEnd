import db from "../lib/db.js"
import type { CategoriaDBType } from "../Utils/types.js"
import type { RowDataPacket } from "mysql2/promise"

const categoriaModel = {
    async create(categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const query = `insert into tbl_categorias values(?,?,?,?,?)`
            const values = [
                null,
                categoria.designacao,
                categoria.icone,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(query, values)
            console.log(rows)
            return rows as CategoriaDBType
        } catch (error) {
            console.log({ "catch categoria.model.ts": error })
            return null
        }
    },
    async getAll(): Promise<CategoriaDBType[] | null> {
        try {
            const query = `select * from tbl_categorias`
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows : []
        } catch (error) {
            console.log({ "catch categoria.model.ts": error })
            return null
        }
    },
    async get(id: string): Promise<CategoriaDBType | null> {
        try {
            const query = `select * from tbl_categorias where id = ?`
            const values = [id]
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CategoriaDBType : null
        } catch (error) {
            console.log({ "catch categoria.model.ts": error })
            return null
        }
    },
    async update(id: string, categoriaAtualizada: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const query = `update tbl_categorias set designacao = ?, icone = ?, updated_at = ? where id = ?`
            const values = [
                categoriaAtualizada.designacao,
                categoriaAtualizada.icone,
                new Date(),
                id
            ]
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(query, values)
            return rows as CategoriaDBType
        } catch (error) {
            console.log({ "catch categoria.model.ts": error })
            return null
        }
    },
    async delete(id: string): Promise<CategoriaDBType | null> {
        try {
            const query = `delete from tbl_categorias where id = ?`
            const values = [id]
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(query, values)
            return rows as CategoriaDBType
        } catch (error) {
            console.log({ "catch categoria.model.ts": error })
            return null
        }
    }
}
export { categoriaModel }
