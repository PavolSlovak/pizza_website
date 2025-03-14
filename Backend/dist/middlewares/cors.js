"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If your requests include credentials (cookies, HTTP auth)
};
console.log("Environment:", process.env.NODE_ENV); // Check the environment
console.log("Client URL:", process.env.CLIENT_URL); // Check the client URL
exports.corsMiddleware = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map