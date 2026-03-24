import { propostaControler } from "../controler/proposta.control.js";
import { Router } from "express";

const propostaRouter ={
    create:"/create",
    getAll:"/",
    get:"/:id",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(propostaRouter.create, propostaControler.create)
router.get(propostaRouter.getAll, propostaControler.getAll)
router.get(propostaRouter.get, propostaControler.get)
router.put(propostaRouter.update, propostaControler.update)
router.delete(propostaRouter.delete, propostaControler.delete)

export {router}