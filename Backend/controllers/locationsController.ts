import { TStoreInfo } from "../schemas/schemas";
import { Location } from "../models/Locations";
import { Request, Response } from "express";

export const createLocations = async (req: Request, res: Response) => {
  try {
    const { locations } = req.body;
    await locations.forEach(async (location: TStoreInfo) => {
      const newLocation = new Location(location);
      const newLocationItem = await newLocation.save();
      console.log("New location created:", newLocationItem);
    });

    res.status(201).json({
      message: "Locations created",
      locations: locations,
    });
  } catch (error) {
    console.error("Error creating locations:", error);
    res.status(500).json({ message: "Error creating locations" });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    console.log("Locations fetched successfully:", locations.length);

    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations" });
  }
};
