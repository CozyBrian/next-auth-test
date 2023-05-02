import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import v1_api from "./routes/v1-router";

const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5173" ,"http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/v1", v1_api)

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

  
export default app;
