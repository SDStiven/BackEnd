import {jest, beforeEach, describe, it, expect } from "@jest/globals"
import { isOwner } from "../security/auth.middelware.js"

describe('Unit tests: isOwner Middleware', () => {
    let mockRequest: any
    let mockResponse: any
    let nextFunction: any = jest.fn()
    // Formacao de response
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })
        it('deve retornar 403 se o usuario não for o dono do recurso', async () => {
            // 1. Simulcão de um  usuário logado 
            mockRequest = {
                user: { id: 'user_123' },
                params: { id: 'servico_999' }
            }

            // 2. simulacão de model (id do dono na BD é ''outro_user')
            const mockModel = {
                get: jest.fn<any>().mockResolvedValue({ id_utilizador: 'outro_user' })
            }
            const middleware = isOwner(mockModel, 'id_utilizador')
            await middleware(mockRequest, mockResponse, nextFunction)
            // 3. verificação : deve bloquer com 403

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'permissão insuficiente'
            })
            expect(nextFunction).not.toHaveBeenCalled()


        })
    
})
