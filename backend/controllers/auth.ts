import { Request,Response,NextFunction } from "express";
import db from "../utils/db";
import { decrypt, encrypt } from "../utils/bcrypt";
import jwt from 'jsonwebtoken';

export async function SignIn(req:Request,res:Response,next:NextFunction){
    console.log("logging in")
    if((req as unknown as {authenticated:boolean}).authenticated){
        return res.json({message:"Another User is already logged in. Please logout",success:false}).status(200);
    }
    const {email,password} = req.body;
    const findUser = await db.user.findUnique({
        where:{
            email
        }
    });
    if(!findUser){
        return res.json({message:"Invalid Credentials",success:false}).status(200);
    }
    const isPasswordValid = await decrypt(password,findUser.password);
    if(!isPasswordValid){
        return res.json({message:"Invalid Credentials",success:false}).status(200);
    }
    const token = jwt.sign({userId:findUser.id},process.env.JWTSECRET as string,{
        expiresIn:"1d",
    });
    res.cookie("eventsToken",token,{
        maxAge:24*60*60*1000,
        secure: true,
        sameSite:"strict",
        httpOnly: true,
    });
    return res.json({message:"signin successful",success:true}).status(200);
}

export async function SignUp(req:Request,res:Response,next:NextFunction){
    if((req as unknown as {authenticated:boolean}).authenticated){
        return res.json({message:"Another User is already logged in. Please logout",success:false}).status(200);
    }
    const body = req.body;
    const {email} = body;

    const findUser = await db.user.findFirst({
        where:{
            email
        }
    });
    if(findUser){
        return res.json({message:`User with email: ${email} already exists.`,success:false}).status(200);
    }
    body.password = await encrypt(body.password)
    const newUser = await db.user.create({
        data:body,
    });
    if(!newUser.id){
        return res.json({message:"Internal Server Error",success:false}).status(500);
    }
    return res.json({message:"signup successful",success:true}).status(200);
}
export async function SignOut(req:Request,res:Response,next:NextFunction){
    res.cookie("eventsToken", "", {
        httpOnly: true, 
        secure: true,
        sameSite: "strict",
        maxAge: 1
    });
    return res.json({message:"signout successful",success:true}).status(200);
}