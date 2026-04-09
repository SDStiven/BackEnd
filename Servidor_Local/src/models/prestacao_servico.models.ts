import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2"
import type { Prestacao_servicoDBType, prestacaoServicoDetalhesType } from "../Utils/types.js"
import { generateUUID } from "../Utils/uuid.js"


export const prestacao_servicoModel = {
    // create prestacao_servico
    async create(novo: Prestacao_servicoDBType) {
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
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get all prestacao_servico
    async getAll() {
        try {
            const query = `select * from tbl_prestacao_servico`
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // get one prestacao_servico by id
    async get(id: string) {
        try {
            const query = `select * from tbl_prestacao_servico where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // update prestacao_servico
    async update(id: string, prestacao_servicoAtualizado: Prestacao_servicoDBType) {
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
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    },
    // delete prestacao_servico
    async delete(id: string) {
        try {
            const query = `delete from tbl_prestacao_servico where id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "catch prestacao_servico.ts": error })
            return null
        }
    }, async getPrestaçãoServicoDetails(limit: number, offset: number) {
        try {
            const query = `
            SELECT 
                ps.id as id_prestação_servico,
                ps.designacao as descricoa,
                u.nome as utilizador,
                u.email as email_utilizador
                s.nome as nome_servico,
                ps.crea_at as data_pedido,
                ps.urgente
                FROM tbl_prestacoa servico ps 
                INNER JOIN tbl_utilizadores u ON ps.id_Utilizador = i.d
                IONER JOIN tbl_servico  s ON ps.id_servico = s.id
                ORDER BY ps.crea_at DESC
                LIMIT ? OFFSET?
            `
            const [rows]= await db.execute(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if(Array.isArray(rows)&& rows.length === 0)return null
            return Array.isArray(rows ? rows as prestacaoServicoDetalhesType[]:null)

        }catch(err){
            console.log(err)
            return null
        }

    },async getByIdOrcamento(idOrcamento: string): Promise<Prestacao_servicoDBType | null> {
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
}
