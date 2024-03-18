import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth_routes";
import EventsRouter from "./routes/events_routes";
dotenv.config();

const corsOrigin = "http://localhost:3000"
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

//middleware

//routes

app.use("/api/auth",AuthRouter);
app.use("/api/",EventsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

