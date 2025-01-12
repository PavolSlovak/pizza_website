// server.js
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { config as dotenvConfig } from "dotenv";
import { corsMiddleware } from "./middlewares/cors.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Remove app.listen() for serverless
connectDB();
app.use(corsMiddleware);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

import Stripe from "stripe";
if (!process.env.STRIPE_PRIVATE_KEY) {
  throw new Error("Stripe private key is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

import { orderRouter } from "./routes/orderRoutes.js";
import { menuRouter } from "./routes/menuRoutes.js";
import { locationRouter } from "./routes/locationRoutes.js";
import { subscribeRouter } from "./routes/subscribeRoutes.js";

app.use("/api/orders", orderRouter);
app.use("/api/menus", menuRouter);
app.use("/api/locations", locationRouter);
app.use("/api/subscribe", subscribeRouter);

// Export the handler to Vercel
export default (req: Request, res: Response) => {
  app(req, res); // Use Express as a handler for serverless
};
