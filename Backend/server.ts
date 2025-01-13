import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { config as dotenvConfig } from "dotenv";
import { corsMiddleware } from "./middlewares/cors.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();
if (process.env.NODE_ENV !== "production") {
  dotenvConfig();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(corsMiddleware);
app.options("*", corsMiddleware);

console.log("CORS enabled for", process.env.NODE_ENV);
console.log("Allowed client URL:", process.env.CLIENT_URL);

connectDB();

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

// Handle root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to the API!");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export default app;
