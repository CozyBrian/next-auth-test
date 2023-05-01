import express from "express";
import { postAuthLogin, postAuthRefresh, PostAuthSignUp } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/signup", PostAuthSignUp);
authRouter.post("/refresh", postAuthRefresh);

export default authRouter;