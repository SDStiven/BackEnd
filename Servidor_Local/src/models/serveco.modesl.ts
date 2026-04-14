import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { formatDate } from "../Utils/date.js";
import type { ServicoDBType, ServicoDetalhadaType } from "../Utils/types.js";
import type { promises } from "node:dns";
 
// Funções do modelo de servico
export const servicoModel = {
    // create servico
    async create(newServico: ServicoDBType): Promise<ServicoDBType | null> {
        try {
            const query = `insert into tbl_servicos values(?,?,?,?,?,?,?)`
            const values = [
                null,
                newServico.nome,
                newServico.descricao,
                newServico.categoria,
                newServico.enabled,
                new Date(),
                new Date()
            ] 
            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values)
            console.log("rows1232", rows)
            return rows as ServicoDBType
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },
 
    // get all services
    async getAll(): Promise<ServicoDBType[] | null> {
        try {
            const servicos = `select * from tbl_servicos`

            const [rows] = await db.execute<ServicoDBType[] & RowDataPacket[]>(servicos)

            return Array.isArray(rows) && rows.length > 0 ? rows : []
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },

    // // get one service by id
    async get(id: string): Promise<ServicoDBType | null> {
        try {
            const servico = "select * from tbl_servicos  WHERE tbl_servicos.id = ? "
            const [rows] = await db.execute<ServicoDBType[] & RowDataPacket[]>(servico, [id])
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },
  

    // update service
    async update(id: string, ServicoAtualizado: ServicoDBType): Promise<ServicoDBType | null> {

        try {
           const updateServico = `update tbl_servicos set nome = ?, descricao = ? ,categoria = ?, enabled = ?, apdate_at = ? where id = ?`
            const values = [
                ServicoAtualizado.nome,
                ServicoAtualizado.descricao,
                ServicoAtualizado.categoria,
                ServicoAtualizado.enabled,
                new Date(),
                id
            ]
            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(updateServico, values)
            return rows as ServicoDBType
        } catch (error) {

            console.log({ "catch Servico.ts": error })
            return null
        }
    },

    // delete service
    async delete(id: string): Promise<ServicoDBType | null> {
        try {
            // query = deletar um servico
            const query = `delete from tbl_servicos where id = ?`
            const values = [id]
            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values)
            
            return rows as ServicoDBType
        } catch (error) {
            console.log({ "catch Servico.ts": error })
            return null
        }
    },
    async getAllServicoDetalhado(limit:number,offset:number):Promise<ServicoDetalhadaType[]|null>{
         try {
            const query = `
            SELECT DISTINCT
               s.id as id_servico
               s.nome as nome_servico
               s.descricao as descricao_servico
               c.designacao as designacao_categoria
               c.icone as icone_categoria
               e.id as id_empresa
               e.designacao as designacao_empresa
               e.icone as icone_empresa
               s.enable

               FROM tbl_servico s 
               INNER JOIN tbl_categoria c ON c.id = id.categoria
               INNER JOIN tbl_servico_empresa se ON se.id_servico = s.id
               INNER JOIN tbl_empresa  e ON e.id = se.id_empresa
               ORDER BY s.created_at DESC
               LIMIT ? OFFSET ?
            `
              const  value =
                [
                    limit,
                    offset
                ]
            const [rows] = await db.execute<(ServicoDetalhadaType & RowDataPacket)[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as ServicoDetalhadaType[] : null
        } catch (err) {
            console.log(err)
            return null
        }

    }

}
