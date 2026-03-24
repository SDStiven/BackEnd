import { Router } from "express"
import { orcamentoControler } from "../controler/orcamento.control.js"

const orcamentoRoute ={
    create:"/create",
    getById:"/getById/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}
const router = Router()

router.post(orcamentoRoute.create, orcamentoControler.create)
router.get(orcamentoRoute.getAll, orcamentoControler.getAll)
router.get(orcamentoRoute.getById, orcamentoControler.get)
router.put(orcamentoRoute.update, orcamentoControler.update)
router.delete(orcamentoRoute.delete, orcamentoControler.delete)

export {router}