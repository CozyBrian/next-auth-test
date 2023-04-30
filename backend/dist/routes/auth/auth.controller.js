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
exports.postAuthRefresh = exports.PostAuthSignUp = exports.postAuthLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../../models/users/user.model");
const user_schema_1 = require("../../models/user.schema");
const TOKEN_EXPIRED = 60 * 24 * 3; // 3 days
const ATokenSecret = process.env.ACCESS_TOKEN_SECRET;
const RTokenSecret = process.env.REFRESH_TOKEN_SECRET;
function _generateToken(data) {
    return jsonwebtoken_1.default.sign(data, ATokenSecret, { expiresIn: `${TOKEN_EXPIRED}h` });
}
const postAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.body;
    const { value: user, error } = user_schema_1.UserSchema.validate(value);
    if (error)
        return res.status(400).json({ message: error });
    try {
        const userExists = yield (0, user_model_1.isUserExists)(user.email);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }
        (0, user_model_1.getUserByEmail)(user.email)
            .then((userdb) => __awaiter(void 0, void 0, void 0, function* () {
            const data = { id: userdb._id.toString(), email: userdb.email };
            const accessToken = _generateToken(data);
            const refreshToken = jsonwebtoken_1.default.sign(data, RTokenSecret);
            const now = new Date();
            now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);
            const token = {
                expiresIn: now.toISOString(),
                accessToken,
                refreshToken,
            };
            if (yield bcrypt_1.default.compare(user.password, userdb.password)) {
                return res.status(200).send(token);
            }
            else {
                return res.status(401).send({
                    error: "WRONG_PASSWORD"
                });
            }
        }))
            .catch((err) => {
            return res.status(500).send({ error: err });
        });
    }
    catch (error) {
        return res.status(500).send({ error: error });
    }
});
exports.postAuthLogin = postAuthLogin;
const PostAuthSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.body;
    const { value: user, error } = user_schema_1.UserSchema.validate(value);
    if (error)
        return res.status(400).json({ message: error });
    try {
        if (yield (0, user_model_1.isUserExists)(user.email)) {
            return res.status(409).send({ error: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
        (0, user_model_1.createNewUser)(newUser)
            .then((user) => {
            const data = { id: user._id.toString(), email: user.email };
            const accessToken = _generateToken(data);
            const refreshToken = jsonwebtoken_1.default.sign(data, RTokenSecret);
            const now = new Date();
            now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);
            const token = {
                expiresIn: now.toISOString(),
                accessToken,
                refreshToken,
            };
            return res.status(201).send(token);
        })
            .catch((err) => {
            return res.status(500).send({ error: err });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
});
exports.PostAuthSignUp = PostAuthSignUp;
const postAuthRefresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === undefined || refreshToken === "") {
        return res.status(401).send({ error: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(refreshToken, RTokenSecret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                error: "Unauthorized"
            });
        }
    });
});
exports.postAuthRefresh = postAuthRefresh;
