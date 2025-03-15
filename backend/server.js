import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import http from "http";
import process from "node:process";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use(cors());
app.use("/api", routes);
