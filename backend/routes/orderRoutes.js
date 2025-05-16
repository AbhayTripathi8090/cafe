const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder); // User places an order
router.get("/my", protect, getMyOrders); // User views own orders
router.get("/", protect, getAllOrders); // Admin views all orders
router.put("/:id", protect, updateOrderStatus); // Admin updates order status

module.exports = router;
