"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = require("../../models/users/user.model");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_model_1.getAllUsers)();
        return res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).send({ error: error });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, user_model_1.getUserByID)(id);
        if (user !== null) {
            return res.status(200).send(user);
        }
        else {
            return res.status(404).send({ error: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ error: error });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, user_model_1.deleteUserByID)(id);
        if (user !== null) {
            return res.status(200).send(user);
        }
        else {
            return res.status(404).send({ error: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ error: error });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    try {
        const updatedUser = yield (0, user_model_1.updateUserByID)(id, body);
        return res.status(200).send(updatedUser);
    }
    catch (error) {
        return res.status(500).send({ error: error });
    }
});
exports.updateUser = updateUser;
