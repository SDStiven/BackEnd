
import type { Request, Response } from "express"
import { orcamentoModel } from "../models/orcamento.moles.js"
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType, type responseType } from "../Utils/types.js"
import { prestacao_servicoModel } from "../models/prestacao_servico.models.js"
import db from "../lib/db.js"
import { propostaModel } from "../models/proposta.models.js"

export const orcamentoControler = {
    // create orcamento
    async create(req: Request, res: Response) {
        try {
            const newOrcamento: OrcamentoDBType = req.body
            if(!newOrcamento){
                const response : responseType<null> = {
                    status: "error",
                    message: "Dados do orcamento inválidos",
                    data: null 
                }
                return res.status(400).json(response)
            }
            const createOrcamentoResponse = await orcamentoModel.create(newOrcamento)
            if(!createOrcamentoResponse){
                const response:responseType<null> = {
                    status: "error",
                    message: "Erro ao criar orcamento",
                    data: null
                }
                return res.status(404).json(response)
            }
            console.log(createOrcamentoResponse)
            const response:responseType<OrcamentoDBType> = {
                status: "success",
                message: "Orcamento criado com sucesso",
                data:newOrcamento
                
            }
            return res.status(201).json(response)
        } catch (error) {
            console.error(error)
            const response:responseType<null> = {
                status: "error",
                message: "Erro interno do servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    }, 
    // get all orcamentos
    async getAll(req: Request, res: Response) {
        try {
            const getOrcamentoResponse = await orcamentoModel.getAll()
            if(!getOrcamentoResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar orcamentos",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Orcamentos buscados com sucesso",
                data: getOrcamentoResponse
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
    // get one orcamento by id
    async get(req: Request, res: Response) {
        try {
            const  id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do orcamento inválido",
                    data: null
                })
            }
            const getOrcamentoResponse = await orcamentoModel.get(id as string)
            if(!getOrcamentoResponse){
                return res.status(404).json({
                    status: "error",
                    message: "Erro ao buscar orcamento",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Orcamento buscado com sucesso",
                data: getOrcamentoResponse
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
    // update orcamento
    async update(req: Request, res: Response) {
        try {
            const  id = req.params.id
            const updateOrcamento:OrcamentoDBType = req.body
            if(!id){
                const response:responseType<null> = {
                    status: "error",
                    message: "ID do orcamento inválido",
                    data: null
                }
                return res.status(400).json(response)
            }
            if(!updateOrcamento){
                const response:responseType<null> = {
                    status: "error",
                    message: "Dados do orcamento inválidos",
                    data: null
                }
                return res.status(400).json(response)
            }
            const updateOrcamentoResponse = await orcamentoModel.update(id as string, updateOrcamento)

            if(!updateOrcamentoResponse){
                const response:responseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar orcamento,verifique se o id existe e se os dados estão corretos",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response:responseType<OrcamentoDBType> = {
                status: "success",
                message: "Orcamento atualizado com sucesso",
                data: updateOrcamento
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error)
            const response:responseType<null> = {
                status: "error",
                message: "Erro interno do servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },
    // delete orcamento
    async delete(req: Request, res: Response) {
        try {
            const  id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do orcamento inválido",
                    data: null
                })
            }
            const deleteOrcamentoResponse = await orcamentoModel.delete(id as string)
            if(!deleteOrcamentoResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao apagar orcamento,verifique se o id existe",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Orcamento apagado com sucesso",
                data: deleteOrcamentoResponse
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
    // calcular total do orcamento
    async calcularTotal(req: Request, res: Response) {
        try {
            const  id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do orcamento inválido",
                    data: null
                })
            }
            const calcularTotalResponse = await orcamentoModel.calcularTotal(id as string)
            if(!calcularTotalResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao calcular total do orcamento,verifique se o id existe",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Total do orcamento calculado e gravado com sucesso",
                data: calcularTotalResponse
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
    /*
        async calculateBudget(req: Request, res: Response) {
            const { id } = req.params
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
    
            // logic based on the following 
            // accepted proposal bring id_prestador which has urgency tax, minimum for discount and discount percentage according to types in utils/types.ts
            // proposal has preco_hora and estimated hours according to utils/types.ts
    
            // then calculate budget
    
            // to fetch proposals we need to fetch prestacao_servico first
            const prestacaoServico = await prestacao_servicoModel.getByIdOrcamento(id as string)
    
            if (!prestacaoServico) {
                return res.status(404).json({
                    status: "error",
                    message: "Prestacao de servico nao encontrada",
                    data: null
                })
            }
    
            // fetch all proposal 
            const proposals = await propostaModel.getByPrestacaoServicoId(prestacaoServico.id as string)
    
            if (!proposals) {
                return res.status(404).json({
                    status: "error",
                    message: "Proposta nao encontrada",
                    data: null
                })
            }
    
            // find accepted proposal
            const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)
    
            if (!acceptedProposal) {
                return res.status(404).json({
                    status: "error",
                    message: "Ainda nenhuma proposta foi aceite.",
                    data: null
                })
            }
    
            const precoHora = acceptedProposal.precoHora
            const horasEstimadas = acceptedProposal.horasEstimadas
    
            // fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utils/types.ts
            const prestador = await prestadorModel.get(acceptedProposal.idPrestador)
    
            if (!prestador) {
                return res.status(404).json({
                    status: "error",
                    message: "Prestador nao encontrado",
                    data: null
                })
            }
    
            const urgencyTax = prestador.taxaUrgencia
            const minimumDiscount = prestador.minimoDesconto
            const discountPercentage = prestador.percentagemDesconto
    
    
            // calculate the budget based on utils/types.ts
            let subtotal = precoHora * horasEstimadas
    
            // if minimum discount is greater than discount percentage
            if (subtotal > minimumDiscount) {
                subtotal = subtotal * (1 - discountPercentage)
            }
    
            if (prestacaoServico.urgente) {
                // add urgency tax
                subtotal = subtotal * (1 + urgencyTax)
            }
    
            const updateOrcamentoResponse = await orcamentoControler.updateBudget(id as string, subtotal)
    
            if (!updateOrcamentoResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao calcular orcamento",
                    data: null
                })
            }
    
            return res.status(200).json({
                status: "success",
                message: "Orcamento calculado e atualizado com sucesso",
                data: updateOrcamentoResponse
            })
        },








            async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }*/
}
    

