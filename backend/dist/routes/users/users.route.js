"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const usersRouter = express_1.default.Router();
usersRouter.get("/", users_controller_1.getUsers);
usersRouter.get("/:id", users_controller_1.getUser);
usersRouter.put("/:id", users_controller_1.updateUser);
usersRouter.delete("/:id", users_controller_1.deleteUser);
exports.default = usersRouter;
