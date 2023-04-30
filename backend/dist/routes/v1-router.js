"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./users/users.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const v1_api = express_1.default.Router();
// v1_api.use('/sites', WhichUser, sitesRouter);
v1_api.use('/users', users_route_1.default);
v1_api.use('/auth', auth_route_1.default);
exports.default = v1_api;
