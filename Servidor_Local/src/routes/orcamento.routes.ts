import { Router } from "express"
import { orcamentoControler } from "../controler/orcamento.control.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../Utils/types.js"

const orcamentoRoute ={
    create:"/create",
    getById:"/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    calcularTotal:"/calcularTotal/:id"
}
const router = Router()
router.use(authMiddelware)

router.post(orcamentoRoute.create,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.create)
router.get(orcamentoRoute.getAll,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.getAll)
router.get(orcamentoRoute.getById,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.get)
router.put(orcamentoRoute.update,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.update)
router.delete(orcamentoRoute.delete,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.delete)
router.put(orcamentoRoute.calcularTotal,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), orcamentoControler.calcularTotal)

export {router}