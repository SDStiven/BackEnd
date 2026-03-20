
import{Router} from "express"
import { servicoComtroler } from "../controler/servico.controler.js"

const ServicoRoute ={
    create:"/create",
    getById:"/getById/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.get (ServicoRoute.getAll, servicoComtroler.getAll)
router.get (ServicoRoute.getById, servicoComtroler.get)
router.post(ServicoRoute.create, servicoComtroler.createServico)
router.put(ServicoRoute.update, servicoComtroler.update)
router.delete(ServicoRoute.delete, servicoComtroler.delete)

export {router}

 