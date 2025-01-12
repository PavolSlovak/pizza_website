import { TCartItem, TMenuItem } from "../../../schemas/schemas";

export const useCalculateTotal = (
  menuData: TMenuItem[],
  cartItems: TCartItem[]
) => {
  // Calculate total
  let newTotal = 0;
  cartItems.forEach((i) => {
    const menuItem = menuData.find((item) => item.id === i.id);
    if (menuItem) {
      const iPriceAfterDiscount =
        (i.quantity *
          (menuItem.price -
            menuItem.price * ((menuItem.discount || 0) / 100))) /
        100;

      newTotal += iPriceAfterDiscount;
    }
  });
  return newTotal;
};
