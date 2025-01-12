import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState as ReduxRootState } from "../../store";
import { useForm } from "react-hook-form";
import { CheckoutFormSchema, TCheckoutForm } from "./../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/ValidatedInput";

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { total, cartItems } = useSelector(
    (state: ReduxRootState) => state.menu
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCheckoutForm>({
    resolver: zodResolver(CheckoutFormSchema),
  });

  function handleCheckout() {
    try {
      fetch("/api/orders/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h2 className="text-xl font-bold text-black">Checkout</h2>
      <form
        action="POST"
        onSubmit={handleSubmit(async (data) => {
          const result = CheckoutFormSchema.safeParse(data);
          if (result.success) {
            console.log(result);
            await handleCheckout();
            /* navigate("?success"); */
          } else {
            console.error(result);
          }
        })}
        className="flex flex-col gap-2"
      >
        <InputField
          label="Card Number"
          type="text"
          name="cardNumber"
          register={register}
          errors={errors.cardNumber}
        />
        <InputField
          label="Name on Card"
          type="text"
          name="nameOnCard"
          register={register}
          errors={errors.nameOnCard}
        />

        <InputField
          label="Expiration Date"
          type="text"
          name="expiryDate"
          register={register}
          errors={errors.expiryDate}
        />
        <InputField
          label="CVV"
          type="text"
          name="cvv"
          register={register}
          errors={errors.cvv}
        />
        <button
          className="styled-button bg-brightRed mt-5 mb-2 w-full"
          onClick={handleCheckout}
        >
          Pay Now
        </button>
      </form>
      <span className="w-full text-right my-5 font-bold text-xl">
        Total: ${total.toFixed(2)}
      </span>

      <button onClick={() => navigate("?summary")}>Back</button>
    </>
  );
};
export default CheckoutForm;
