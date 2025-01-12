import { TMenuItem } from "../schemas/schemas";
import { Request, Response } from "express";
import { menuItems } from "../MenuItems";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu: TMenuItem[] = menuItems;
    res.status(200).json(menu);
  } catch (error) {
    console.error("Error getting menu:", error);
    res.status(500).json({ message: "Error getting menu" });
  }
};
