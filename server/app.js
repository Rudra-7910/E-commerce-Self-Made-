import express, { Router } from "express"
import dotenv from "dotenv"
import dns from "dns"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
dotenv.config();
const port= process.env.PORT
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5174",
        ].filter(Boolean);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
}))
app.use(express.json());
app.use("/api",userRoutes)
app.use("/api",productRoutes)
app.use("/api",cartRoutes)
app.use("/api",orderRoutes)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected Succesfully");
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}
const startServer=async() =>{
    try {
        await connectDB();
        app.listen(port,()=>{
            console.log(`server started listening on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
    }
}
startServer()


