import express from "express";
import { postAuthLogin, getAuthRefresh, PostAuthSignUp, getAuthLogout } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/signup", PostAuthSignUp);
authRouter.get("/refresh", getAuthRefresh);
authRouter.get("/logout", getAuthLogout);

export default authRouter;