"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStribeCheckoutSession = exports.submitNewOrder = void 0;
const Order_1 = require("../models/Order");
const server_1 = require("../server");
const MenuItems_1 = require("../MenuItems");
const submitNewOrder = async (req, res) => {
    try {
        const body = req.body;
        const newOrder = new Order_1.Order(body);
        await newOrder.save();
        res.status(200).json({ newOrder });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.submitNewOrder = submitNewOrder;
const getStribeCheckoutSession = async (req, res) => {
    try {
        const session = await server_1.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: req.body.cartItems.map((cartItem) => {
                const storeItem = MenuItems_1.menuItems.find((item) => item.id === cartItem.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                            images: [storeItem.image],
                        },
                        unit_amount: storeItem.price,
                    },
                    quantity: cartItem.quantity,
                };
            }),
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/order?success`,
            cancel_url: `${process.env.CLIENT_URL}/order?cancelled`,
        });
        res.status(200).json({ url: session.url });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getStribeCheckoutSession = getStribeCheckoutSession;
//# sourceMappingURL=ordersController.js.map