"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInfoSchema = exports.CheckoutFormSchema = exports.OrderFormSchema = exports.DeliveryOrderSchema = exports.NoDeliveryOrderSchema = exports.AddressSchema = void 0;
const zod_1 = require("zod");
//
// Menu Schemas
//
const MenuItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    image: zod_1.z.string(),
    category: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    description: zod_1.z.string(),
    discount: zod_1.z.number(),
});
const CartItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
});
//
// Personal Info Form Schemas
//
exports.AddressSchema = zod_1.z.object({
    streetAddress: zod_1.z.string().min(3),
    streetAddress2: zod_1.z.string().min(1),
    city: zod_1.z.string().min(3),
    state: zod_1.z.string().min(2),
    postalCode: zod_1.z.string().min(4),
    comments: zod_1.z.string().optional(),
});
exports.NoDeliveryOrderSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10),
    deliveryType: zod_1.z.enum(["pickup"]),
    isPayed: zod_1.z.boolean(),
    items: zod_1.z.array(CartItemSchema),
    total: zod_1.z.number().positive(),
});
exports.DeliveryOrderSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10),
    deliveryType: zod_1.z.enum(["delivery"]),
    isPayed: zod_1.z.boolean(),
    items: zod_1.z.array(CartItemSchema),
    total: zod_1.z.number().positive(),
})
    .merge(exports.AddressSchema);
exports.OrderFormSchema = zod_1.z.discriminatedUnion("deliveryType", [
    exports.NoDeliveryOrderSchema,
    exports.DeliveryOrderSchema,
]);
// Checkout Schemas
exports.CheckoutFormSchema = zod_1.z.object({
    cardNumber: zod_1.z.string().min(16),
    nameOnCard: zod_1.z.string().min(3),
    expiryDate: zod_1.z.string().min(5),
    cvv: zod_1.z.string().min(3),
});
exports.StoreInfoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    city: zod_1.z.string(),
    postalCode: zod_1.z.string(),
    state: zod_1.z.string(),
    phone: zod_1.z.string(),
    lat: zod_1.z.number(),
    lon: zod_1.z.number(),
});
/* const envSchema = z.object({
  SECRET_KEY: z.string(),
});
export const env = envSchema.parse(process.env); */
//# sourceMappingURL=schemas.js.map