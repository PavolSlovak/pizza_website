import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { useDispatch } from "react-redux";
import {
  addToCart,
  onQuantityChange,
  removeFromCart,
} from "../../../store/menuSlice";
import { TMenuItem } from "./../../../../schemas/schemas";

type ItemCardProps = {
  item: TMenuItem;
};
export const ItemCard: FC<ItemCardProps> = ({ item }: ItemCardProps) => {
  const { cartItems } = useSelector((state: ReduxRootState) => state.menu);
  const currentQuantity = cartItems.find((i) => i.id === item.id)?.quantity;
  const [quantity, setQuantity] = useState(currentQuantity || 1); // Track the quantity state

  const priceAfterDiscount =
    (item.price - item.price * ((item.discount || 0) / 100)) / 100;

  const checkboxRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function handleCheckboxChange() {
    if (checkboxRef.current?.checked) {
      dispatch(addToCart({ id: item.id, quantity: quantity }));
    } else {
      dispatch(removeFromCart({ id: item.id }));
    }
  }
  function handleParentClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!checkboxRef.current?.checked) {
      dispatch(addToCart({ id: item.id, quantity: quantity }));
    } else {
      dispatch(removeFromCart({ id: item.id }));
    }
  }
  function handleChangeQuantity(e: React.ChangeEvent<HTMLSelectElement>) {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity); // Update local state immediately
    dispatch(
      onQuantityChange({
        id: item.id,
        quantity: newQuantity,
      })
    );
  }

  return (
    <div
      className="flex hover:bg-slate-200 transition-all duration-300 flex-col border cursor-pointer z-20"
      onClick={(e) => handleParentClick(e)}
    >
      {/* Card Image */}
      <div className="relative h-[200px] overflow-hidden ">
        <img
          src={item.image}
          alt={item.name}
          className=" w-full h-full object-cover"
        />
        <DiscountBadge discount={item.discount} />
        <input
          ref={checkboxRef}
          type="checkbox"
          className="absolute top-3 left-3  w-8 h-8 bg-brightRed rounded-full z-40 "
          onChange={handleCheckboxChange}
          checked={cartItems.find((i) => i.id === item.id) ? true : false}
        />
      </div>
      {/* Card Body */}
      <div className="relative flex flex-col w-full  p-4">
        <div className="">
          <h4 className="text-lg font-bold">{item.name}</h4>
          <p className="text-sm">{item.description}</p>
        </div>
      </div>
      {/* Card Footer */}

      <div className="flex justify-between items-center mt-auto p-4">
        {/* Price */}
        <div className="flex flex-col">
          <span
            className={`text-lg font-bold ${
              item.discount ? "line-through" : ""
            }`}
          >
            ${(item.price / 100).toFixed(2)}
          </span>
          {item.discount > 0 && (
            <span className="text-lg font-bold text-brightRed">
              {priceAfterDiscount.toFixed(2)}
            </span>
          )}
        </div>
        {/* Quantity */}
        <QuantitySelector onChange={handleChangeQuantity} quantity={quantity} />
      </div>
    </div>
  );
};
const DiscountBadge: FC<{ discount: number }> = ({ discount }) => {
  if (!discount) return null;
  return (
    <div className="absolute bottom-3 right-3 bg-brightRed text-white p-3 rounded-bl-xl shadow-sm">
      <p className="text-sm"> Discount -{discount}%</p>
    </div>
  );
};
const QuantitySelector: FC<{
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  quantity: number;
}> = ({ onChange, quantity }) => {
  return (
    <div>
      <label className="flex text-sm" htmlFor="quantity">
        Quantity
      </label>
      <select
        id="quantity"
        className="z-40 boder "
        onClick={(e) => e.stopPropagation()}
        onChange={onChange}
        value={quantity}
      >
        {[1, 2, 3, 4, 5].map((num, idx) => (
          <option key={idx} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};
