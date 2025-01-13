import cors from "cors";

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If your requests include credentials (cookies, HTTP auth)
};
console.log("Environment:", process.env.NODE_ENV); // Check the environment
console.log("Client URL:", process.env.CLIENT_URL); // Check the client URL

export const corsMiddleware = cors(corsOptions);
