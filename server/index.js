import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouterr } from "./router/UserRoute.js";
import { noteRouterr } from "./router/noteRoute.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouterr);
app.use("/", noteRouterr);

const DATABASE_URL = process.env.CONNECTION_URL;
mongoose.connect(DATABASE_URL);

app.listen(3001, () => console.log("server is running"));
