
import { Router } from "express";
import { userControler } from "../controler/user.controler.js";
import authMiddelware from "../security/auth.middelware.js";

const UserRoute = {
    create: "/create",
    getById: "/getById/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
}

const router = Router();
 
router.get(UserRoute.getAll,authMiddelware,userControler.getAll)

router.get(UserRoute.getById,userControler.get)
router.post(UserRoute.create,userControler.create)
router.put(UserRoute.update,userControler.update)
router.delete(UserRoute.delete,userControler.delete)
router.post(UserRoute.login,userControler.login)

export { router }  