import { getMenu } from "../controllers/menusController";
import express from "express";

const router = express.Router();

router.get("/", getMenu);

export { router as menuRouter };
