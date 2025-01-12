import { TCartItem, TMenuItem, TOrderForm } from "../schemas/schemas";
import { Request, Response } from "express";

import { Order } from "../models/Order";
import { stripe } from "../server";
import { menuItems } from "../MenuItems";

export const submitNewOrder = async (req: Request, res: Response) => {
  try {
    const body: TOrderForm = req.body;
    const newOrder = new Order(body);
    await newOrder.save();

    res.status(200).json({ newOrder });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getStribeCheckoutSession = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.cartItems.map((cartItem: TCartItem) => {
        const storeItem = menuItems.find(
          (item: TMenuItem) => item.id === cartItem.id
        );

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem!.name,
              images: [storeItem!.image],
            },
            unit_amount: storeItem!.price,
          },
          quantity: cartItem.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order?success`,
      cancel_url: `${process.env.CLIENT_URL}/order?cancell
      ed`,
    });
    res.status(200).json({ url: session.url });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
