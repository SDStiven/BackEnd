import { Router } from "express"
import { prestacao_servicoControler } from "../controler/prestacao_servico.controler.js"


const Prestacao_servicoRoute ={
    create:"/create",
    getById:"/getById/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getPrestaçãoServicoDetalhada:"/get-all-detalhado"
}
const router= Router()

router.post(Prestacao_servicoRoute.create, prestacao_servicoControler.create)
router.get(Prestacao_servicoRoute.getAll, prestacao_servicoControler.getAll)
router.get(Prestacao_servicoRoute.getById, prestacao_servicoControler.get)
router.put(Prestacao_servicoRoute.update, prestacao_servicoControler.update)
router.delete(Prestacao_servicoRoute.delete, prestacao_servicoControler.delete)
router.get(Prestacao_servicoRoute.getPrestaçãoServicoDetalhada, prestacao_servicoControler.getPrestaçãoServicoDetalhada)

export {router}
