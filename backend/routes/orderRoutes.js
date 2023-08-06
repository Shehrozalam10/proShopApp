import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)


// router.post("/logout", logoutUser);

// router.post("/auth", authUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);
export default router;
