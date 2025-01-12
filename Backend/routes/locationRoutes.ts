import {
  createLocations,
  getLocations,
} from "../controllers/locationsController";
import express from "express";

const router = express.Router();

router.post("/", createLocations);

router.get("/", getLocations);
export { router as locationRouter };
