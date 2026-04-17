import { Router } from "express"
import { empresaControler } from "../controler/empresa.controler.js"

const empresaRoute = {
    create: "/create",
    getById: "/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(empresaRoute.create, empresaControler.create)
router.get(empresaRoute.getAll, empresaControler.getAll)
router.get(empresaRoute.getById, empresaControler.get)
router.put(empresaRoute.update, empresaControler.update)
router.delete(empresaRoute.delete, empresaControler.delete)

export { router }
