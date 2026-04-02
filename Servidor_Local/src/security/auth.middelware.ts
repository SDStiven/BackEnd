import type { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"

export default function authMiddelware (req:Request,res:Response,next:NextFunction){
    const authHerder = req.headers.authorization

    if(!authHerder){
        return res.status(401).json({message:"user not autorized"})
    }

    const token = authHerder.split(" ")[1]
    try {
        const decodedToken = jwt.verify(token as string, process.env.jwt_secret as string)
        next()
        
    } catch (error) {
        return res.status(401).json({message:"token invalid"})
    }

}

/*
req{
    headers:{
        authorization:"Bearer dhgdgdgjfhfghfghfgh64546uyurtttrr"
    }
}
*/