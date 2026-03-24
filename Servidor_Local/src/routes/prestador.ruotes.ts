

import { Router } from "express";
import { prestadorControler } from "../controler/prestador.controler.js";


const prestadorRoutes = {
    create:'/create',
    getAll: '/',
    getById: 'getById/:id',
    update: 'update/:id',
    delete: 'delete/:id'
}

const router = Router()

router.post(prestadorRoutes.create, prestadorControler.create)
router.get(prestadorRoutes.getAll, prestadorControler.getAll)
router.get(prestadorRoutes.getById, prestadorControler.get)
router.put(prestadorRoutes.update, prestadorControler.update)
router.delete(prestadorRoutes.delete, prestadorControler.delete)

export { router } 