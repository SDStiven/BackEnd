import { userModel } from "../../models/user.models.js";
import type { UtilizadorDBType } from "../../Utils/types.js";

export const userResolvers = {
    Query: {
        getallusers: async () => {
            return await userModel.getAll();
        },
        getuserbyid: async (_: any,args: { id: string }) => {
            return await userModel.get(args.id);
        },
        
        
    },
    Mutation: {
        creatUser:async(_:any,args:{user:UtilizadorDBType})=>{
            return await userModel.create(args.user);
        },
        updateUser:async(_:any,args:{id:string,user:UtilizadorDBType})=>{
            return await userModel.update(args.id,args.user);
        },
        deleteUser:async(_:any,args:{id:string})=>{
            return await userModel.delete(args.id);
        }
    } 
};