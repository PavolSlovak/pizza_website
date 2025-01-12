"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubscriber = void 0;
const Subscribe_1 = require("../models/Subscribe");
const addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        const newSubscriber = new Subscribe_1.Subscribe({ email });
        await newSubscriber.save();
        console.log("New subscriber:", email);
        res.status(201).json({
            message: "Subscriber added",
            email,
        });
    }
    catch (error) {
        console.error("Error adding subscriber:", error);
        res.status(500).json({ message: "Error adding subscriber" });
    }
};
exports.addSubscriber = addSubscriber;
//# sourceMappingURL=subscribersController.js.map