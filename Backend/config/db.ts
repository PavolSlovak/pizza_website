import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL || "", {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(process.env.DB_URL);
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
export { connectDB };
