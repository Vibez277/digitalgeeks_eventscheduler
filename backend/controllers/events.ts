import { Request,Response,NextFunction } from "express";
import db from "../utils/db";
import { decrypt, encrypt } from "../utils/bcrypt";
import jwt from 'jsonwebtoken';

async function CreateEvent(req:Request,res:Response,next:NextFunction){
    const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated; 
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const body = req.body;
    body.authorId = userId;

    const newEvent = await db.event.create({
        data:body
    });
    if(!newEvent.id){
        return res.json({message:"Internal Server Error",success:false}).status(500);
    }
    return res.json({message:"Event created",success:true}).status(200);
}
async function GetEvents(req:Request,res:Response,next:NextFunction){
    const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated;
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const events = await db.event.findMany({
        where:{
            authorId:userId
        }
    });
    return res.json({message:"Success",success:true,events}).status(200);
}
async function GetEvent(req:Request,res:Response,next:NextFunction){
    const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated;
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const eventId = req.params.id;
    const event = await db.event.findFirst({
        where:{
            id:eventId,
            authorId:userId
        }
    });
    if(!event){
        return res.json({message:"Internal Server Error",success:false}).status(500);
    }
    return res.json({message:"Success",success:true,event}).status(200);
}
async function UpdateEvent(req:Request,res:Response,next:NextFunction){
    const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated;
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const eventId = req.params.id;
    const body = req.body;
    const updatedEvent = await db.event.update({
        where:{
            id:eventId,
            authorId:userId
        },
        data:body
    });
    if(!updatedEvent.id){
        return res.json({message:"Internal Server Error",success:false}).status(500);
    }
    return res.json({message:"Success",success:true,updatedEvent}).status(200);
}
async function DeleteEvent(req:Request,res:Response,next:NextFunction){
    const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated;
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const eventId = req.params.id;
    const body = req.body;
    const deletedEvent = await db.event.delete({
        where:{
            id:eventId,
            authorId:userId
        }
    });
    if(!deletedEvent.id){
        return res.json({message:"Internal Server Error",success:false}).status(500);
    }
    return res.json({message:"Success",success:true}).status(200);
}

export {
    CreateEvent,
    GetEvents,
    GetEvent,
    UpdateEvent,
    DeleteEvent
}