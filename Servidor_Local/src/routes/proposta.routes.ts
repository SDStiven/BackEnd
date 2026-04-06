import { propostaControler } from "../controler/proposta.control.js";
import { Router } from "express";
import authMiddelware from "../security/auth.middelware.js";

const propostaRouter ={
    create:"/create",
    getAll:"/",
    get:"/:id",
    update:"/update/:id",
    delete:"/delete/:id",
    aceitar:"/aceitar/:id"
}

const router = Router()
router.post(propostaRouter.create, propostaControler.create)
router.get(propostaRouter.getAll, propostaControler.getAll)
router.get(propostaRouter.get, propostaControler.get)
router.put(propostaRouter.update, propostaControler.update)
router.delete(propostaRouter.delete, propostaControler.delete)
router.put(propostaRouter.aceitar, authMiddelware, propostaControler.aceitar)

export {router}