import express from "express";
const router = express.Router();
import {isAuthenticatedUser,  authorizeRoles } from "../backend/middlewares/auth.js"
import { allOrders, deleteOrder, getSales, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";
import { canUserReview, createProductReview, deleteReview, getProductReviews } from "../controllers/productControllers.js";

router.route("/orders/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/me/orders").get(isAuthenticatedUser, myOrders)
router.route("/can_review").get(isAuthenticatedUser, canUserReview)
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), allOrders)
router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews).put(isAuthenticatedUser, createProductReview)
router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview)
router.route("/admin/getsales").get(isAuthenticatedUser, authorizeRoles("admin"), getSales)

export default router;