import express from "express";
import usersRouter from "./users/users.route";
import authRouter from "./auth/auth.route";
import notesRouter from "./notes/notes.route";
import WhichUser from "../middlewares/jwt";

const v1_api = express.Router();

v1_api.use('/users', usersRouter);
v1_api.use('/auth', authRouter)
v1_api.use("/notes", WhichUser, notesRouter);

export default v1_api;