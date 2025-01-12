import { TCartItem, TOrderForm } from "../schemas/schemas";

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log("baseUrl: ", baseUrl);
export const fetchMenu = async () => {
  const response = await fetch(baseUrl + "/menus", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return response.json();
};

export const fetchStoresLocations = async () => {
  console.log("fetching store locations");
  const response = await fetch(baseUrl + "/locations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response: ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch store locations");
  }
  return response.json();
};
export const postOrder = async (order: TOrderForm) => {
  const response = await fetch(baseUrl + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Failed to post order");
  }
  return response.json();
};

export const postSubscriber = async (email: string) => {
  const response = await fetch(baseUrl + "/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error("Failed to post subscriber");
  }
  return response.json();
};

export const checkoutOrder = async (cartItems: TCartItem[]): Promise<void> => {
  const response = await fetch(baseUrl + "/orders/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems }),
  });

  if (!response.ok) {
    return Promise.reject("Failed to create checkout session");
  }
  const { url } = await response.json();
  if (url) {
    window.location = url;
    /*     console.log("Redirecting to:", url); */
  }
};
