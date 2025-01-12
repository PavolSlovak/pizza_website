import cors from "cors";

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "*", // Use CLIENT_URL for production, allow all origins in development
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
console.log("Environment:", process.env.NODE_ENV); // Check the environment
console.log("Client URL:", process.env.CLIENT_URL); // Check the client URL

export const corsMiddleware = cors(corsOptions);
