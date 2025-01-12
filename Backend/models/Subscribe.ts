import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

export const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
