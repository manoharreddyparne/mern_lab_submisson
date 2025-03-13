import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"
const app = express();
dotenv.config();
const server = http.createServer(app);
mongoose.connect("mongodb+srv://parnemanoharreddy19:Pandu1919@auctismc1.91ca1.mongodb.net/?retryWrites=true&w=majority&appName=AuctiSMC1")
.then(()=>{
    console.log("Connected");
    const PORT = 8080;
    server.listen(PORT,()=>{
        console.log(`running on ${PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
})
app.use(express.json());
app.use(cors());
