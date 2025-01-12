"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeRouter = void 0;
const subscribersController_1 = require("../controllers/subscribersController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.subscribeRouter = router;
router.post("/", subscribersController_1.addSubscriber);
//# sourceMappingURL=subscribeRoutes.js.map