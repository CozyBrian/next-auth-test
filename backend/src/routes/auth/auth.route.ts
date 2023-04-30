import express from "express";
import { postAuthLogin, PostAuthSignUp } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/signup", PostAuthSignUp);

export default authRouter;