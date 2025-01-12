import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { TMenuItem } from "./../../../../schemas/schemas";

const OrderSummary = () => {
  const { total, cartItems, menuData } = useSelector(
    (state: ReduxRootState) => state.menu
  );
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-black">Ordered Items</h2>

        {cartItems.map((i, idx) => {
          const menuItem = menuData.find((item) => item.id === i.id);
          if (!menuItem) return null;
          return (
            <SummaryItem key={idx} item={menuItem} quantity={i.quantity} />
          );
        })}
        <span className="w-full text-right mt-5 font-bold text-xl">
          Total: ${total.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default OrderSummary;

const SummaryItem = ({
  item,
  quantity,
}: {
  item: TMenuItem;
  quantity: number;
}) => {
  const priceAfterDiscount =
    (item.price * (1 - (item.discount ?? 0) / 100)) / 100;
  return (
    <div className="flex justify-between">
      <span>
        {quantity} x {item.name}
      </span>
      <div className="flex space-x-2">
        {item.discount > 0 && (
          <>
            <span className="line-through ">
              ${((item.price / 100) * quantity).toFixed(2)}
            </span>
            <span className="text-brightRed">
              ${priceAfterDiscount.toFixed(2)}
            </span>
          </>
        )}
        {!item.discount && (
          <span>${((item.price / 100) * quantity).toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};
