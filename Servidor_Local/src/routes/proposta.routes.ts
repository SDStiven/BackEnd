import { propostaControler } from "../controler/proposta.control.js";
import { Router } from "express";
import authMiddelware, { autorized } from "../security/auth.middelware.js";
import { Role } from "../Utils/types.js";

const propostaRouter ={
    create:"/create",
    getAll:"/",
    get:"/:id",
    update:"/update/:id",
    delete:"/delete/:id",
    aceitar:"/aceitar/:id"
}

const router = Router()

router.get(propostaRouter.getAll,propostaControler.getAll)
router.get(propostaRouter.get,propostaControler.get)

router.use(authMiddelware)

router.post(propostaRouter.create,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA]),propostaControler.create)
router.put(propostaRouter.update,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA]),propostaControler.update)
router.delete(propostaRouter.delete,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA]),propostaControler.delete)
router.put(propostaRouter.aceitar,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA]),propostaControler.aceitar)

export {router}