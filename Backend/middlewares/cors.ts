import cors from "cors";

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "*", // Use CLIENT_URL for production, allow all origins in development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsMiddleware = cors(corsOptions);
