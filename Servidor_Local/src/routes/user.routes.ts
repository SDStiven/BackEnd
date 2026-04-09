
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
    updatePassword: "/updatePassword/:id",
    resetPassword: "/resetPassword/:id",
}

const router = Router();
 
router.get(UserRoute.getAll,userControler.getAll)
router.get(UserRoute.getById,authMiddelware,userControler.get)
router.post(UserRoute.create,userControler.create)
router.put(UserRoute.update,authMiddelware,userControler.update)
router.delete(UserRoute.delete,authMiddelware,userControler.delete)
router.post(UserRoute.login,userControler.login)
router.put(UserRoute.updatePassword,authMiddelware,userControler.updatePassword)
router.put(UserRoute.resetPassword, userControler.resetPassword)


export { router }  