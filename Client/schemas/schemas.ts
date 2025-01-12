import { z } from "zod";
//
// Menu Schemas
//
const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  category: z.string(),
  price: z.number().positive(),
  description: z.string(),
  discount: z.number(),
});

export type TMenuItem = z.infer<typeof MenuItemSchema>;

const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().positive(),
});

export type TCartItem = z.infer<typeof CartItemSchema>;
//
// Personal Info Form Schemas
//
export const AddressSchema = z.object({
  streetAddress: z.string().min(3),
  streetAddress2: z.string().min(1),
  city: z.string().min(3),
  state: z.string().min(2),
  postalCode: z.string().min(4),
  comments: z.string().optional(),
});
export type TAddress = z.infer<typeof AddressSchema>;

export const NoDeliveryOrderSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  deliveryType: z.enum(["pickup"]),
  isPayed: z.boolean(),
  items: z.array(CartItemSchema),
  total: z.number().positive(),
});

export const DeliveryOrderSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    deliveryType: z.enum(["delivery"]),
    isPayed: z.boolean(),
    items: z.array(CartItemSchema),
    total: z.number().positive(),
  })

  .merge(AddressSchema);

export const OrderFormSchema = z.discriminatedUnion("deliveryType", [
  NoDeliveryOrderSchema,
  DeliveryOrderSchema,
]);
export type TOrderForm = z.infer<typeof OrderFormSchema>;

// Checkout Schemas
export const CheckoutFormSchema = z.object({
  cardNumber: z.string().min(16),
  nameOnCard: z.string().min(3),
  expiryDate: z.string().min(5),
  cvv: z.string().min(3),
});
export type TCheckoutForm = z.infer<typeof CheckoutFormSchema>;

export const StoreInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  state: z.string(),
  phone: z.string(),
  lat: z.number(),
  lon: z.number(),
});
export type TStoreInfo = z.infer<typeof StoreInfoSchema>;

/* const envSchema = z.object({
  SECRET_KEY: z.string(),
});
export const env = envSchema.parse(process.env); */
