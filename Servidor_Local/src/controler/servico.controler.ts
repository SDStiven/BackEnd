
import type { Request, Response } from "express"
import { servicoModel } from "../models/serveco.modesl.js"
import type { responseType, ServicoDBType, ServicoDetalhadaType } from "../Utils/types.js"

 
export const servicoComtroler = {
    // create servico
    async createServico(req: Request, res: Response): Promise<ServicoDBType | any> {
        try {
            const newServico:ServicoDBType = req.body
            if(!newServico){
                return res.status(400).json({
                    status: "error",
                    message: "Dados do servico inválidos",
                    data: null
                })
            } 

            const CreiteServicoRsesponse = await servicoModel.create(newServico)

            if(CreiteServicoRsesponse === null){
                return res.status(400).json({
                    status: "error",
                    message: "erro ao criar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico criado com sucesso",
                data: CreiteServicoRsesponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    // get all services
    async getAll(req: Request, res: Response): Promise<ServicoDBType[] | any> {
        try {
            const getServicoResponse = await servicoModel.getAll()

            if(!getServicoResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar servicos",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servicos buscados com sucesso",
                data: getServicoResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },

    // get one service by id
    async get(req: Request, res: Response): Promise<ServicoDBType | any> {
        try {
            const id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do servico inválido",
                    data: null
                })
            }
            const getServicoResponse = await servicoModel.get(id as string)
            if(!getServicoResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico buscado com sucesso",
                data: getServicoResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },

    // update service
    async update(req: Request, res: Response): Promise<ServicoDBType | any> {
        try {
            const  id = req.params.id
            const updateServico:ServicoDBType = req.body
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do servico inválido",
                    data: null
                })
            }
            if(!updateServico){
                return res.status(400).json({
                    status: "error",
                    message: "Dados do servico inválidos",
                    data: null
                })
            }
            const updateServicoResponse = await servicoModel.update(id as string, updateServico)
            if(!updateServicoResponse){
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico atualizado com sucesso",
                data: updateServicoResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },

    // delete service
    async delete(req: Request, res: Response): Promise<ServicoDBType | any> {
        try {
            const  id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do servico inválido",
                    data: null
                })
            }
            const deleteServicoResponse = await servicoModel.delete(id as string)
            return res.status(200).json({
                status: "success",
                message: "Servico apagado com sucesso",
                data: deleteServicoResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    async getAllServicoDetalhado(req: Request, res: Response): Promise<ServicoDetalhadaType[] | any> {
        try {
            const {limit,offset} = req.query
            let LIMIT =  10
            let OFFSET =  0
            if(limit){
                LIMIT = parseInt(limit as string)
            }
            if(offset){
                OFFSET = parseInt(offset as string)
            }
           const getAllServicoDetalhadoResponse = await servicoModel.getAllServicoDetalhado(LIMIT,OFFSET)

           if(!getAllServicoDetalhadoResponse){
            const response :responseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos",
                data: null
            }
            return res.status(500).json(response)
           }
           const response :responseType<ServicoDetalhadaType[]> = {
            status: "success",
            message: "Servicos buscados com sucesso",
            data: getAllServicoDetalhadoResponse
           }
           return res.status(200).json(response)
           
        } catch (error) {
            console.error(error)
            const response :responseType<null> = {
                status: "error",
                message: "Erro interno do servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },
} 

 