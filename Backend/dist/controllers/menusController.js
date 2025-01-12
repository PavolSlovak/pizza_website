"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
const MenuItems_1 = require("../MenuItems");
const getMenu = async (req, res) => {
    try {
        const menu = MenuItems_1.menuItems;
        res.status(200).json(menu);
    }
    catch (error) {
        console.error("Error getting menu:", error);
        res.status(500).json({ message: "Error getting menu" });
    }
};
exports.getMenu = getMenu;
//# sourceMappingURL=menusController.js.map