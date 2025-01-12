import mongoose, { Schema, Document, mongo } from "mongoose";
import { z } from "zod";
import { MenuItemSchema } from "./Menu";
import { TOrderForm } from "../schemas/schemas";
import { number } from "zod";

const CartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quantity: { type: Number, required: true },
});
// Mongoose model schema structure based on Zod's OrderFormSchema
const OrderFormSchema = new mongoose.Schema<TOrderForm>(
  {
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
  },

  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", OrderFormSchema);
