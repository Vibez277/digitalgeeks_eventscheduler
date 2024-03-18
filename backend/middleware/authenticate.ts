import { Request,Response,NextFunction } from "express";
import db from "../utils/db";
import { decrypt, encrypt } from "../utils/bcrypt";
import jwt from 'jsonwebtoken';

export async function Authenticate(req:Request,res:Response,next:NextFunction){
   const {eventsToken} = req.cookies;
   if(!eventsToken){
    (req as unknown as {authenticated:boolean}).authenticated = false;
    next();
    return;
   }
   const decoded:any = jwt.decode(eventsToken);
   const findUser = await db.user.findUnique({
    where:{
        id:decoded.userId
    }
   });
   if(!findUser){
    (req as unknown as {authenticated:boolean}).authenticated = false;
   }else{
    (req as unknown as {authenticated:boolean}).authenticated = true;
    (req as unknown as {userId:string}).userId = decoded.userId;
   }
    next();
}