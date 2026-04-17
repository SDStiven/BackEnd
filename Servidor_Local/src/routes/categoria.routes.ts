
import { Router } from "express"
import { categoriaControler } from "../controler/categoria.controler.js"

const categoriaRoute = {
    create:"/create",
    getById:"/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()


router.post(categoriaRoute.create, categoriaControler.create)
router.get(categoriaRoute.getAll, categoriaControler.getAll)
router.get(categoriaRoute.getById, categoriaControler.get)
router.put(categoriaRoute.update, categoriaControler.update)
router.delete(categoriaRoute.delete, categoriaControler.delete)

export {router}