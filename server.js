import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from './utils/connectDB.js';
import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
// import partnerRoutes from './routes/partnerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
//admin side bashboard 
import dashboardRoutes from "./routes/dashboardRoutes.js";


import helpRoutes from './routes/helpRoutes.js';

import bodyParser from 'body-parser';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// For ES modules __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
app.use("/api/admin", adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use('/api/help', helpRoutes);

app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
