"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dotenv_2 = require("dotenv");
const cors_js_1 = require("./middlewares/cors.js");
const db_js_1 = require("./config/db.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_2.config)();
}
(0, db_js_1.connectDB)();
app.use(cors_js_1.corsMiddleware);
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
const stripe_1 = __importDefault(require("stripe"));
if (!process.env.STRIPE_PRIVATE_KEY) {
    throw new Error("Stripe private key is not defined");
}
exports.stripe = new stripe_1.default(process.env.STRIPE_PRIVATE_KEY);
const orderRoutes_js_1 = require("./routes/orderRoutes.js");
const menuRoutes_js_1 = require("./routes/menuRoutes.js");
const locationRoutes_js_1 = require("./routes/locationRoutes.js");
const subscribeRoutes_js_1 = require("./routes/subscribeRoutes.js");
app.use("/api/orders", orderRoutes_js_1.orderRouter);
app.use("/api/menus", menuRoutes_js_1.menuRouter);
app.use("/api/locations", locationRoutes_js_1.locationRouter);
app.use("/api/subscribe", subscribeRoutes_js_1.subscribeRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map