"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
const menusController_1 = require("../controllers/menusController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.menuRouter = router;
router.get("/", menusController_1.getMenu);
//# sourceMappingURL=menuRoutes.js.map