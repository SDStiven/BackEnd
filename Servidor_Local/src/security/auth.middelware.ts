import type { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                role: string
            }
        }
    }
}
export default function authMiddelware (req:Request,res:Response,next:NextFunction){
    const authHerder = req.headers.authorization

    if(!authHerder){
        return res.status(401).json({message:"user not autorized"})
    }

    const token = authHerder.split(" ")[1]
    try {
        const decodedToken = jwt.verify(token as string, (process.env.JWT_SECRET || process.env.jwt_secret) as string) as {id:string,email:string,role:string}

        req.user={
            id:decodedToken.id,
            email:decodedToken.email,
            role:decodedToken.role
        }
        next()
    } catch (error) {
        return res.status(401).json({message:"token invalid"})
    }

}
export function autorized(role:string[]){
    return(req:Request,res:Response,next:NextFunction)=>{
        if(!req.user){
            return res.status(401).json({message:"user not autorized"})
        }
        if(!role.includes(req.user.role)){
            return res.status(403).json({message:"user not autorized"})
        }
        next()
    }
}

/*
req{
    headers:{
        authorization:"Bearer dhgdgdgjfhfghfghfgh64546uyurtttrr"
    }
}
*/