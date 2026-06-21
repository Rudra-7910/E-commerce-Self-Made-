import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/products.js";

dotenv.config();

const productsToCreate = [
  {
    title: "QuantumX Pro Gaming Mouse",
    description: "Ultra-lightweight gaming mouse with a 20,000 DPI optical sensor, RGB lighting, and programmable buttons for precision and comfort.",
    category: "Electronics",
    price: 3500,
    stock: 50,
    images: [{ id: "img-1", url: "https://images.unsplash.com/photo-1527814050087-1523412cbbe5?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Astra Mechanical Keyboard",
    description: "Tenkeyless mechanical keyboard featuring tactile brown switches, aircraft-grade aluminum frame, and customizable backlighting.",
    category: "Electronics",
    price: 6500,
    stock: 30,
    images: [{ id: "img-2", url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Aura Noise-Cancelling Headphones",
    description: "Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and high-fidelity sound.",
    category: "Electronics",
    price: 12999,
    stock: 25,
    images: [{ id: "img-3", url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Titan Smart Fitness Watch",
    description: "Advanced smartwatch with 24/7 heart rate monitoring, built-in GPS, sleep tracking, and a vibrant AMOLED display.",
    category: "Electronics",
    price: 8999,
    stock: 45,
    images: [{ id: "img-4", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "EcoCharge 20000mAh Power Bank",
    description: "High-capacity portable charger featuring dual USB-C fast charging ports, digital battery display, and a compact design.",
    category: "Electronics",
    price: 2499,
    stock: 100,
    images: [{ id: "img-5", url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Vanguard Everyday Backpack",
    description: "Water-resistant tech backpack with dedicated compartments for a 15-inch laptop, tablet, and everyday essentials.",
    category: "Accessories",
    price: 4999,
    stock: 60,
    images: [{ id: "img-6", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "AeroFit Running Shoes",
    description: "Lightweight, breathable athletic shoes engineered with responsive cushioning for maximum energy return on long runs.",
    category: "Footwear",
    price: 5500,
    stock: 80,
    images: [{ id: "img-7", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Classic Leather Wallet",
    description: "Minimalist bifold wallet crafted from full-grain leather, featuring RFID blocking technology and multiple card slots.",
    category: "Fashion",
    price: 1500,
    stock: 120,
    images: [{ id: "img-8", url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Luma Ambient Table Lamp",
    description: "Smart table lamp with adjustable color temperatures, app control, and a sleek modern aesthetic for your desk or nightstand.",
    category: "Home",
    price: 3200,
    stock: 40,
    images: [{ id: "img-9", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Breeze Premium Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat made from natural rubber, providing excellent grip and cushioning for any workout.",
    category: "Fitness",
    price: 2100,
    stock: 75,
    images: [{ id: "img-10", url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Nova 4K Action Camera",
    description: "Rugged waterproof action camera recording in stunning 4K resolution, featuring digital stabilization and a wide-angle lens.",
    category: "Electronics",
    price: 14500,
    stock: 20,
    images: [{ id: "img-11", url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Urban Blend Coffee Beans",
    description: "1kg of ethically sourced, medium-dark roast coffee beans delivering a rich, chocolatey flavor with hints of caramel.",
    category: "Home",
    price: 1200,
    stock: 150,
    images: [{ id: "img-12", url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Stainless Steel French Press",
    description: "Double-walled insulated French press coffee maker designed to keep your brew hot and flavorful for hours.",
    category: "Home",
    price: 2800,
    stock: 35,
    images: [{ id: "img-13", url: "https://images.unsplash.com/photo-1510251197878-c1e40eb61e93?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Polaris Polarized Sunglasses",
    description: "Stylish aviator sunglasses equipped with polarized lenses for superior glare reduction and 100% UV protection.",
    category: "Fashion",
    price: 2400,
    stock: 90,
    images: [{ id: "img-14", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Oasis Smart Water Bottle",
    description: "Insulated water bottle that tracks your hydration levels and glows to remind you to drink water throughout the day.",
    category: "Accessories",
    price: 3500,
    stock: 55,
    images: [{ id: "img-15", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Vertex Ergonomic Office Chair",
    description: "Fully adjustable ergonomic chair with lumbar support, breathable mesh back, and padded armrests for long work sessions.",
    category: "Home",
    price: 18500,
    stock: 15,
    images: [{ id: "img-16", url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Crescent LED Monitor Light Bar",
    description: "Space-saving monitor light bar that illuminates your desk without causing screen glare, featuring touch controls.",
    category: "Electronics",
    price: 4200,
    stock: 30,
    images: [{ id: "img-17", url: "https://images.unsplash.com/photo-1517055748834-297cf87f8725?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Zenith Wireless Charging Pad",
    description: "Fast 15W wireless charging pad compatible with all Qi-enabled devices, featuring a sleek, minimalist aluminum design.",
    category: "Electronics",
    price: 1600,
    stock: 65,
    images: [{ id: "img-18", url: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Cascade Weekend Duffle Bag",
    description: "Durable canvas weekend bag with leather accents, perfect for short trips and gym sessions, featuring a shoe compartment.",
    category: "Fashion",
    price: 5500,
    stock: 25,
    images: [{ id: "img-19", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Ascend Resistance Band Set",
    description: "Complete set of 5 premium fabric resistance bands with carrying case, ideal for home workouts and physical therapy.",
    category: "Fitness",
    price: 1200,
    stock: 110,
    images: [{ id: "img-20", url: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&w=900&q=80" }]
  },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const created = await Product.insertMany(productsToCreate);
    console.log(`Successfully added ${created.length} new products!`);
  } catch (error) {
    console.error("Failed to add random products:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
