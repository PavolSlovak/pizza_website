import { TMenuItem } from "./schemas/schemas";

export const menuItems: TMenuItem[] = [
  {
    id: "1",
    name: "Margarita",
    price: 1000, // $10.00 in cents
    description: "Tomato, mozzarella, basil",
    category: "Pizzas",
    image: "pizza1.jpg",
    discount: 15,
  },
  {
    id: "2",
    name: "Hawaiian",
    price: 1500, // $15.00 in cents
    description: "Tomato, pineapple, ham",
    category: "Pizzas",
    image: "pizza2.jpg",
    discount: 10,
  },
  {
    id: "3",
    name: "Bacon Pizza",
    price: 2000, // $20.00 in cents
    description: "Tomato, bacon, mozzarella, basil",
    category: "Pizzas",
    image: "pizza2.jpg",
    discount: 0,
  },
  {
    id: "4",
    name: "Coca Cola",
    price: 599, // $5.99 in cents
    description: "Coca Cola 330ml",
    category: "Drinks",
    image: "coca-cola.jpg",
    discount: 0,
  },
  {
    id: "5",
    name: "Fanta",
    price: 599, // $5.99 in cents
    description: "Fanta 330ml",
    category: "Drinks",
    image: "fanta.jpg",
    discount: 0,
  },
  {
    id: "6",
    name: "Jarritos",
    price: 599, // $5.99 in cents
    description: "Jarritos 330ml",
    category: "Drinks",
    image: "jarritos.jpg",
    discount: 0,
  },
  {
    id: "6",
    name: "Jarritos",
    price: 800, // $5.99 in cents
    description: "Jarritos 5000ml",
    category: "Drinks",
    image: "jarritos.jpg",
    discount: 0,
  },
];
