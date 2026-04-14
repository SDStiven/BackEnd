
import{Router} from "express"
import { servicoComtroler } from "../controler/servico.controler.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../Utils/types.js"

const ServicoRoute ={
    create:"/create",
    getById:"/getById/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllServicoDetalhado:"/getAllServicoDetalhado"
} 
 
const router = Router()

router.use(authMiddelware)

router.get (ServicoRoute.getAll, servicoComtroler.getAll)
router.get (ServicoRoute.getById, servicoComtroler.get)
router.post(ServicoRoute.create,autorized([Role.ADMIN]), servicoComtroler.createServico)
router.put(ServicoRoute.update,autorized([Role.ADMIN]), servicoComtroler.update)
router.delete(ServicoRoute.delete,autorized([Role.ADMIN]), servicoComtroler.delete)
router.get(ServicoRoute.getAllServicoDetalhado,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), servicoComtroler.getAllServicoDetalhado)

export {router}

 