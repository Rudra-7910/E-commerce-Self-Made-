import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/user.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Convert the first user found into an admin
    const user = await User.findOne();
    if (!user) {
      console.log("No users found. Please register an account first.");
      process.exitCode = 1;
      return;
    }

    user.role = "admin";
    await user.save();
    console.log(`Success! The user account '${user.email}' has been upgraded to an admin.`);

  } catch (error) {
    console.error("Failed to update user:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
