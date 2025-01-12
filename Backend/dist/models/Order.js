"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    quantity: { type: Number, required: true },
});
// Mongoose model schema structure based on Zod's OrderFormSchema
const OrderFormSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
    },
    deliveryType: {
        type: String,
        enum: ["pickup", "delivery"],
        required: true,
    },
    streetAddress: {
        type: String,
        minlength: 3,
        required: function () {
            return this.deliveryType === "delivery";
        },
    },
    streetAddress2: {
        type: String,
        minlength: 1,
        required: function () {
            return this.deliveryType === "delivery";
        },
    },
    city: {
        type: String,
        minlength: 3,
        required: function () {
            return this.deliveryType === "delivery";
        },
    },
    state: {
        type: String,
        minlength: 2,
        required: function () {
            return this.deliveryType === "delivery";
        },
    },
    postalCode: {
        type: String,
        minlength: 4,
        required: function () {
            return this.deliveryType === "delivery";
        },
    },
    comments: {
        type: String,
        optional: true,
    },
    isPayed: {
        type: Boolean,
        required: true,
    },
    items: [
        {
            type: CartItemSchema,
            required: true,
        },
    ],
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Order = mongoose_1.default.model("Order", OrderFormSchema);
//# sourceMappingURL=Order.js.map