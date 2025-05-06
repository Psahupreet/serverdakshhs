// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  placeOrder,
  getAllOrders,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ make sure this is correct
// import { isAdmin } from "../middleware/isAdmin.js"; 

const router = express.Router();

// Create order
router.post("/", protect, createOrder);

router.post("/place", protect, placeOrder);

// Get orders for the logged-in user
router.get("/my-orders", protect, getUserOrders);

//get admin
router.get("/AllOrders", protect, getAllOrders);

// Cancel order
router.delete("/:id", protect, cancelOrder);


export default router;
