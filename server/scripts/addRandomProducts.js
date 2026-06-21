import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/products.js";

dotenv.config();

const titles = [
  "Nimbus Running Shoes",
  "ArcTone Wireless Earbuds",
  "Luma Smart Desk Lamp",
  "TerraSteel Water Bottle",
  "PixelWeave Hoodie",
  "BreezeFit Yoga Mat",
];

const descriptions = [
  "Lightweight build with everyday comfort and durable sole.",
  "Balanced sound profile with long battery life and quick charge.",
  "Adjustable brightness with warm and cool lighting modes.",
  "Double-wall insulated bottle that keeps drinks cold for hours.",
  "Soft fabric hoodie with clean fit and minimal branding.",
  "High-grip mat for workouts, stretching, and daily practice.",
];

const categories = ["Footwear", "Electronics", "Home", "Accessories", "Fashion", "Fitness"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice() {
  return Math.floor(Math.random() * 2500) + 499;
}

function randomStock() {
  return Math.floor(Math.random() * 40) + 5;
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const productsToCreate = Array.from({ length: 2 }).map(() => {
      const title = randomItem(titles);
      return {
        title,
        description: randomItem(descriptions),
        category: randomItem(categories),
        price: randomPrice(),
        stock: randomStock(),
        images: [
          {
            id: `seed-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
          },
        ],
      };
    });

    const created = await Product.insertMany(productsToCreate);
    console.log("Added products:");
    created.forEach((p) => console.log(`- ${p.title} (ID: ${p._id})`));
  } catch (error) {
    console.error("Failed to add random products:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
