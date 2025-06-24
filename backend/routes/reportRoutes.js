import express from "express";
import {
  getProductSalesReport,
  getDailySalesReport,
  getMonthlySalesReport,
} from "../controllers/reportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sales/products", protect, admin, getProductSalesReport);
router.get("/sales/daily", protect, admin, getDailySalesReport);
router.get("/sales/monthly", protect, admin, getMonthlySalesReport);

export default router;
