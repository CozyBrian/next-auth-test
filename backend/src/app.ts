import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import v1_api from "./routes/v1-router";

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/v1", v1_api)

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

  
export default app;
