import {
  getStribeCheckoutSession,
  submitNewOrder,
} from "../controllers/ordersController";
import express from "express";

const router = express.Router();

router.post("/", submitNewOrder);
router.post("/create-checkout-session", getStribeCheckoutSession);

export { router as orderRouter };
