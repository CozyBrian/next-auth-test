import express from "express";

import { deleteUser, getUser, getUsers, updateUser } from "./users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.put("/:id",updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;