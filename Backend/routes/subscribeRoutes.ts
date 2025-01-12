import { addSubscriber } from "../controllers/subscribersController";
import express from "express";

const router = express.Router();

router.post("/", addSubscriber);

export { router as subscribeRouter };
