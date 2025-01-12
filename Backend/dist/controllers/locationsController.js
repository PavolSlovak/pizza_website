"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocations = exports.createLocations = void 0;
const Locations_1 = require("../models/Locations");
const createLocations = async (req, res) => {
    try {
        const { locations } = req.body;
        await locations.forEach(async (location) => {
            const newLocation = new Locations_1.Location(location);
            const newLocationItem = await newLocation.save();
            console.log("New location created:", newLocationItem);
        });
        res.status(201).json({
            message: "Locations created",
            locations: locations,
        });
    }
    catch (error) {
        console.error("Error creating locations:", error);
        res.status(500).json({ message: "Error creating locations" });
    }
};
exports.createLocations = createLocations;
const getLocations = async (req, res) => {
    try {
        const locations = await Locations_1.Location.find();
        console.log("Locations fetched successfully:", locations.length);
        res.status(200).json(locations);
    }
    catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ message: "Error fetching locations" });
    }
};
exports.getLocations = getLocations;
//# sourceMappingURL=locationsController.js.map