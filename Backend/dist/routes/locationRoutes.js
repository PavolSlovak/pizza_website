"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const locationsController_1 = require("../controllers/locationsController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.locationRouter = router;
router.post("/", locationsController_1.createLocations);
router.get("/", locationsController_1.getLocations);
//# sourceMappingURL=locationRoutes.js.map