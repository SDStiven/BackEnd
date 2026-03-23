

import { Router } from "express";
import { prestadorControler } from "../controler/prestador.controler.js";

const servicoRoutes = {
    create:'/create',
    getAll: '/',
    get: '/:id',
    update: '/:id',
    delete: '/:id'
}

export const prestadorRoutes = Router()

prestadorRoutes.post(servicoRoutes.create, prestadorControler.create)
prestadorRoutes.get(servicoRoutes.getAll, prestadorControler.getAll)
prestadorRoutes.get(servicoRoutes.get, prestadorControler.get)
prestadorRoutes.put(servicoRoutes.update, prestadorControler.update)
prestadorRoutes.delete(servicoRoutes.delete, prestadorControler.delete)