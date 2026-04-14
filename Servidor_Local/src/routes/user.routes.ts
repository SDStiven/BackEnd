
import { Router } from "express";
import { userControler } from "../controler/user.controler.js";
import authMiddelware, { autorized } from "../security/auth.middelware.js";
import { Role } from "../Utils/types.js";

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

router.post(UserRoute.login,userControler.login)
router.post(UserRoute.create,userControler.create)



router.use(authMiddelware)

router.get(UserRoute.getAll,autorized([Role.ADMIN]),userControler.getAll)
router.get(UserRoute.getById,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), userControler.get)
router.put(UserRoute.update,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]),userControler.update)
router.delete(UserRoute.delete,autorized([Role.ADMIN]),userControler.delete)
router.put(UserRoute.updatePassword,autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]),userControler.updatePassword)
router.put(UserRoute.resetPassword, autorized([Role.ADMIN,Role.PRESTADOR,Role.EMPRESA,Role.CLIENTE]), userControler.resetPassword)


export { router }  

