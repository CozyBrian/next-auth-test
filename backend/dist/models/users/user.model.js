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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByID = exports.updateUserByID = exports.getAllUsers = exports.getUserByID = exports.getUserByEmail = exports.isUserExists = exports.createNewUser = void 0;
const user_mongo_1 = __importDefault(require("./user.mongo"));
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_mongo_1.default(user);
        return yield newUser.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.createNewUser = createNewUser;
const isUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExists = yield user_mongo_1.default.exists({ email: email });
        return isExists !== null;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.isUserExists = isUserExists;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_mongo_1.default.findOne({ email: email });
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_mongo_1.default.findById(id, { __v: 0, password: 0 });
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getUserByID = getUserByID;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_mongo_1.default.find({}, { __v: 0, password: 0 });
        return users;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const updateUserByID = (id, updated_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_mongo_1.default.findByIdAndUpdate(updated_user._id, updated_user, { new: true });
        return yield (user === null || user === void 0 ? void 0 : user.save());
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.updateUserByID = updateUserByID;
const deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_mongo_1.default.findByIdAndDelete(id);
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.deleteUserByID = deleteUserByID;
