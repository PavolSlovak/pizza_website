import { Subscribe } from "../models/Subscribe";
import { Request, Response } from "express";

export const addSubscriber = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const newSubscriber = new Subscribe({ email });
    await newSubscriber.save();
    console.log("New subscriber:", email);
    res.status(201).json({
      message: "Subscriber added",
      email,
    });
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res.status(500).json({ message: "Error adding subscriber" });
  }
};
