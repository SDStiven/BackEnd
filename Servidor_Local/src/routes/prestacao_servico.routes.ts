import { Router } from "express"
import { prestacao_servicoControler } from "../controler/prestacao_servico.controler.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../Utils/types.js"

const Prestacao_servicoRoute ={
    create:"/create",
    getById:"/getById/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getPrestaçãoServicoDetalhada:"/get-all-detalhado",
    getPrestaçãoServicoCategoria:"/get-all-categoria/:idCategoria"
}
const router= Router()
router.get(Prestacao_servicoRoute.getPrestaçãoServicoCategoria, prestacao_servicoControler.getPrestaçãoServicoCategoria)
router.get(Prestacao_servicoRoute.getPrestaçãoServicoDetalhada,  prestacao_servicoControler.getPrestaçãoServicoDetalhada)

router.use(authMiddelware)

router.post(Prestacao_servicoRoute.create, autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA]), prestacao_servicoControler.create)
router.get(Prestacao_servicoRoute.getAll, autorized([Role.ADMIN,Role.CLIENTE,Role.EMPRESA]), prestacao_servicoControler.getAll)
router.get(Prestacao_servicoRoute.getById, autorized([Role.ADMIN,Role.CLIENTE,Role.EMPRESA]), prestacao_servicoControler.get)
router.put(Prestacao_servicoRoute.update, autorized([Role.ADMIN]), prestacao_servicoControler.update)
router.delete(Prestacao_servicoRoute.delete, autorized([Role.ADMIN]), prestacao_servicoControler.delete)

export {router}

