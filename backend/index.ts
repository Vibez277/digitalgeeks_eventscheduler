import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth_routes";
import EventsRouter from "./routes/events_routes";
import { Authenticate } from "./middleware/authenticate";
import db from "./utils/db";
dotenv.config();

const corsOrigin = "https://digitalgeeks-eventscheduler.vercel.app"
const app = express();
app.use(cors({
  origin:corsOrigin,
  credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/authorized',Authenticate,(req,res)=>{
  const isAuthenticated = (req as unknown as {authenticated:boolean}).authenticated;
    if(!isAuthenticated){
        return res.json({message:"Unauthorized",success:false}).status(200);
    }

    const userId = (req as unknown as {userId:string}).userId;
    const user = db.user.findUnique({
      where:{
        id:userId,
      }
    });
    if(!user){
      return res.json({message:"Unauthorized",success:false}).status(200);
    }
    return res.json({message:"success",success:true,user}).status(200);
})

//middleware

//routes

app.use("/api/auth",AuthRouter);
app.use("/api/",EventsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

