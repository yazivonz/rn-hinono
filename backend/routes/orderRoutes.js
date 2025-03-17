// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} = require("../controllers/orderController");

// Order routes
router.post("/", isAuthenticatedUser, createOrder);
router.get("/me", isAuthenticatedUser, getUserOrders);
router.get("/:id", isAuthenticatedUser, getOrderById);
router.put("/:id/status", isAuthenticatedUser, updateOrderStatus);

module.exports = router;