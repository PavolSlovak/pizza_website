"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./config/db.js");
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
// if (process.env.NODE_ENV === "development") {
(0, dotenv_1.config)();
// }
const cors_js_1 = require("./middlewares/cors.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(cors_js_1.corsMiddleware);
app.options("*", cors_js_1.corsMiddleware);
console.log("CORS enabled for", process.env.NODE_ENV);
console.log("Allowed client URL:", process.env.CLIENT_URL);
(0, db_js_1.connectDB)();
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
// Handle root route
app.get("/", (req, res) => {
    res.send("Hello, welcome to the API!");
});
if (process.env.NODE_ENV === "development") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map