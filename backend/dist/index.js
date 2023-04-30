"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const mongo_1 = __importDefault(require("./mongo"));
const PORT = process.env.PORT || 3001;
const server = http_1.default.createServer(app_1.default);
function startServer() {
    server.listen(PORT, () => {
        (0, mongo_1.default)();
        console.log(`Listening on port ${PORT}`);
    });
}
startServer();
