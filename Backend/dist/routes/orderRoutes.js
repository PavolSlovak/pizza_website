"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const ordersController_1 = require("../controllers/ordersController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.orderRouter = router;
router.post("/", ordersController_1.submitNewOrder);
router.post("/create-checkout-session", ordersController_1.getStribeCheckoutSession);
//# sourceMappingURL=orderRoutes.js.map