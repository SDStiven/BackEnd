
import { Router } from "express";
import { prestadorControler } from "../controler/prestador.controler.js";
import authMiddelware, { autorized } from "../security/auth.middelware.js";
import { Role } from "../Utils/types.js";

const prestadorRoutes = {
    create:'/create',
    getAll: '/',
    getById: '/getById/:id',
    update: '/update/:id',
    delete: '/delete/:id'
}

const router = Router()

router.get(prestadorRoutes.getAll, prestadorControler.getAll)
router.get(prestadorRoutes.getById, prestadorControler.get)

router.use(authMiddelware)

router.post(prestadorRoutes.create, autorized([Role.ADMIN,Role.CLIENTE,Role.EMPRESA]), prestadorControler.create)
router.put(prestadorRoutes.update, autorized([Role.ADMIN]), prestadorControler.update)
router.delete(prestadorRoutes.delete, autorized([Role.ADMIN]), prestadorControler.delete)

export { router } 
