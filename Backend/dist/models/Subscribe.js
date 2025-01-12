"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SubscribeSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
});
exports.Subscribe = mongoose_1.default.model("Subscribe", SubscribeSchema);
//# sourceMappingURL=Subscribe.js.map