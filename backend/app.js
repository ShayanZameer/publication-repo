import express from "express";
import userRoute from "./routes/user.js";
import bookRouter from "./routes/book.js";
import fileRouter from "./routes/upload.js";
import paymentRouter from "./routes/payment.js";
import problemRouter from "./routes/problems.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env"
})

//using middlewares
app.use(express.json({limit:"20mb"}));
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }
// ))


app.use("/api/v1/users" ,userRoute);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/report", problemRouter);

app.get("/", (req, res)=>{
    res.send("Glorious publications site is live now!");
})

app.use(errorMiddleware);