import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Helper to build date filter
const getDateFilter = (from, to) => {
  const filter = {};
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) {
      // Add 1 day to include the 'to' date fully
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1);
      filter.createdAt.$lt = toDate;
    }
  }
  return filter;
};

//@desc Product based sales report
//@route GET /api/reports/sales/products
//@access Private/Admin
const getProductSalesReport = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = getDateFilter(from, to);
  const sales = await Order.aggregate([
    { $match: match },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.product",
        totalSold: { $sum: "$orderItems.qty" },
        totalSales: {
          $sum: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    {
      $project: {
        _id: 1,
        name: "$productInfo.name",
        totalSold: 1,
        totalSales: 1,
      },
    },
    { $sort: { totalSales: -1 } },
  ]);
  res.status(200).json(sales);
});

//@desc Get sales report
//@route GET /api/reports/sales
//@access Private/Admin
const getSalesReport = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = getDateFilter(from, to);
  const sales = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
        totalItems: { $sum: { $sum: "$orderItems.qty" } },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  res.status(200).json(
    sales.map((s) => ({
      _id: s._id,
      date: s._id,
      totalOrders: s.totalOrders,
      totalSales: s.totalSales,
      totalItems: s.totalItems,
    }))
  );
});

//@desc Daily sales report
//@route GET /api/reports/sales/daily
//@access Private/Admin
const getDailySalesReport = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = getDateFilter(from, to);
  const sales = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        date: {
          $first: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
        totalItems: { $sum: { $sum: "$orderItems.qty" } },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  res.status(200).json(sales);
});

//@desc Monthly sales report
//@route GET /api/reports/sales/monthly
//@access Private/Admin
const getMonthlySalesReport = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const match = getDateFilter(from, to);
  const sales = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        month: {
          $first: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
        totalItems: { $sum: { $sum: "$orderItems.qty" } },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  res.status(200).json(sales);
});

export {
  getProductSalesReport,
  getSalesReport,
  getDailySalesReport,
  getMonthlySalesReport,
};
