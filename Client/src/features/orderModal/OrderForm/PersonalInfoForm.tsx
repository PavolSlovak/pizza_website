import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema, TOrderForm } from "../../../../schemas/schemas";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/ValidatedInput";
import OrderSummary from "./OrderSummary";
import { checkoutOrder, postOrder } from "../../../../utils/http";

function PersonalInfoForm() {
  const { cartItems, total } = useSelector(
    (state: ReduxRootState) => state.menu
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TOrderForm>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      deliveryType: "pickup",
      items: cartItems,
      total: total,
      isPayed: false,
    },
  });
  const navigate = useNavigate();
  const deliveryType = watch("deliveryType");

  async function handleCheckout() {
    try {
      await checkoutOrder(cartItems);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function onFormSubmit(data: TOrderForm) {
    const form = OrderFormSchema.safeParse(data);
    if (form.success) {
      console.log(form);
      const response = await postOrder(data as TOrderForm);
      console.log("Order response:", response);
      await handleCheckout();
    } else {
      console.error(form.error.errors);
    }
  }
  const isDelivery = deliveryType === "delivery";
  return (
    <>
      {/* Order Summary */}
      <OrderSummary />

      {/* Personal Information Form */}
      <form
        onSubmit={handleSubmit(onFormSubmit, (errors) => console.log(errors))}
      >
        {/* Personal Details */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-black">Personal Details</h2>

          <InputField
            register={register}
            name="name"
            label="Name"
            type="text"
            placeholder="Name"
            errors={errors.name}
          />

          <InputField
            register={register}
            name="phone"
            label="Phone"
            type="text"
            placeholder="Phone"
            errors={errors.phone}
          />

          <InputField
            register={register}
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            errors={errors.email}
          />
        </div>

        {/* Delivery Type */}
        <p>Do you want to pick up your order?</p>

        <div className="mb-4 ">
          <label htmlFor={deliveryType} className="block mb-2">
            Yes
          </label>
          <input
            type="radio"
            value="pickup"
            className="border p-2 outline-none w-full"
            {...register("deliveryType")}
          />
          {errors && (
            <span className="text-red-500">{errors.deliveryType?.message}</span>
          )}
        </div>

        <InputField
          register={register}
          name="deliveryType"
          value="delivery"
          label="No"
          type="radio"
          errors={errors.deliveryType}
        />

        {/* Delivery Address */}
        {isDelivery && (
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">Delivery Address</h3>
            <InputField
              register={register}
              name="streetAddress"
              label="Street Address"
              type="text"
              placeholder="Street Address"
              errors={
                "streetAddress" in errors ? errors.streetAddress : undefined
              }
            />

            <InputField
              register={register}
              name="streetAddress2"
              label="Street Address Line 2"
              type="text"
              placeholder="Street Address Line 2"
              errors={
                "streetAddress2" in errors ? errors.streetAddress2 : undefined
              }
            />

            <div className="flex space-x-3">
              <div className="flex flex-col">
                <InputField
                  register={register}
                  name="city"
                  label="City"
                  type="text"
                  placeholder="City"
                  errors={"city" in errors ? errors.city : undefined}
                />
              </div>
              <div className="flex flex-col">
                <InputField
                  register={register}
                  name="state"
                  label="State"
                  type="text"
                  placeholder="State"
                  errors={"state" in errors ? errors.state : undefined}
                />
              </div>
            </div>

            <InputField
              register={register}
              name="postalCode"
              label="Postal Code"
              type="text"
              placeholder="Postal Code"
              errors={"postalCode" in errors ? errors.postalCode : undefined}
            />

            <textarea
              className="border p-2 outline-none"
              placeholder="Additional Information"
              {...register("comments", { shouldUnregister: true })}
            />
          </div>
        )}

        <button className="styled-button bg-brightRed mt-5 w-full">
          Proceed to Checkout
        </button>
        <button
          type="button"
          className="mt-5 w-full"
          onClick={() => navigate("?menu")}
        >
          Back to Menu
        </button>
      </form>
      {/* Navigation Buttons */}
    </>
  );
}

export default PersonalInfoForm;
