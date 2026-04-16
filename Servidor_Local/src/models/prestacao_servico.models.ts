import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2"
import type { Prestacao_servicoDBType, prestacaoServicocategoria, prestacaoServicoDetalhesType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"


export const prestacao_servicoModel = {
    // create prestacao_servico
    async create(novo: Prestacao_servicoDBType): Promise<Prestacao_servicoDBType | null> {
        try {
            const query = `insert into tbl_prestacao_servico values(?,?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                novo.disignacao,
                novo.subtotal,
                novo.haras_estimadas,
                novo.id_prestador,
                novo.id_servico,
                novo.preco_hora,
                novo.estado,
                novo.id_orcamento,
                novo.enabled,
                new Date(),
                new Date(),
            ]
            const [rows] = await db.execute<Prestacao_servicoDBType & RowDataPacket[]>(query, values)
            return rows as Prestacao_servicoDBType
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get all prestacao_servico
    async getAll(): Promise<Prestacao_servicoDBType[] | null> {
        try {
            const query = `select * from tbl_prestacao_servico`
            const [rows] = await db.execute<Prestacao_servicoDBType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows : []
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get one prestacao_servico by id
    async get(id: string): Promise<Prestacao_servicoDBType | null> {
        try {
            const query = `select * from tbl_prestacao_servico where id = ?`
            const values = [id]
            const [rows] = await db.execute<Prestacao_servicoDBType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as Prestacao_servicoDBType : null
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // update prestacao_servico
    async update(id: string, prestacao_servicoAtualizado: Prestacao_servicoDBType): Promise<Prestacao_servicoDBType | null> {
        try {
            const query = `update tbl_prestacao_servico set disignacao = ?, subtotal = ?, haras_estimadas = ?, id_prestador = ?, id_servico = ?, preco_hora = ?, estado = ?, id_orcamento = ?, enabled = ?, created_at = ?, preco_hora = ? where id = ?`
            const values = [
                prestacao_servicoAtualizado.disignacao,
                prestacao_servicoAtualizado.subtotal,
                prestacao_servicoAtualizado.haras_estimadas,
                prestacao_servicoAtualizado.id_prestador,
                prestacao_servicoAtualizado.id_servico,
                prestacao_servicoAtualizado.preco_hora,
                prestacao_servicoAtualizado.estado,
                prestacao_servicoAtualizado.id_orcamento,
                prestacao_servicoAtualizado.enabled,
                new Date(),
                prestacao_servicoAtualizado.preco_hora,
                id
            ]
            const [rows] = await db.execute<Prestacao_servicoDBType & RowDataPacket[]>(query, values)
            return rows as Prestacao_servicoDBType
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // delete prestacao_servico
    async delete(id: string): Promise<Prestacao_servicoDBType | null> {
        try {
            const query = `delete from tbl_prestacao_servico where id = ?`
            const values = [id]
            const [rows] = await db.execute<Prestacao_servicoDBType & RowDataPacket[]>(query, values)
            return rows as Prestacao_servicoDBType
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    }, async getPrestaçãoServicoDetails(limit: number, offset: number): Promise<prestacaoServicoDetalhesType[] | null> {
        try {
            const query = `
            SELECT 
                ps.id as id_prestação_servico,
                s.id as id_servico,
                
                ps.designacao as descricao,
                u.nome as utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgente
                FROM tbl_prestacao_servico ps 
                INNER JOIN tbl_utilizadores u ON ps.id_Utilizador = u.id
                INNER JOIN tbl_servicos  s ON ps.id_servico = s.id
                ORDER BY ps.created_at DESC
                LIMIT ? OFFSET ?
            `
            const [rows] = await db.execute<(prestacaoServicoDetalhesType& RowDataPacket)[]>(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as prestacaoServicoDetalhesType[] : null

        } catch (err) {
            console.log(err)
            return null
        }

    }, async getByIdOrcamento(idOrcamento: string): Promise<Prestacao_servicoDBType | null> {
        try {
            const [rows] = await db.execute<Prestacao_servicoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id_orcamento = ?`,

                [idOrcamento]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as Prestacao_servicoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAllPrestacaoServicoCategoria(idCategoria:string):Promise<prestacaoServicocategoria[]|null>{
        try {
            console.log("idCategoria", idCategoria)
            const [rows] = await db.execute<(prestacaoServicocategoria & RowDataPacket)[]>(
                `SELECT DISTINCT

                u.nome as utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgente,
                ps.id as id_prestacao_servico,
                ps.preco_hora as preco_hora,
                
                c.id as id_categoria,
                c.designacao as nome_categoria,
                c.icone as icone_categoria

                FROM tbl_prestacao_servico ps 
                INNER JOIN tbl_utilizadores u ON ps.id_Utilizador = u.id
                INNER JOIN tbl_servicos  s ON ps.id_servico = s.id
                INNER JOIN tbl_categorias c ON s.id_categoria = c.id AND c.id = ?`,

                [idCategoria]
            )
            
            if (Array.isArray(rows) && rows.length === 0) return []
            return Array.isArray(rows) ? rows as prestacaoServicocategoria[] :[]

            
        } catch (err) {
            console.log(err)
            return null
        }
    }
}
