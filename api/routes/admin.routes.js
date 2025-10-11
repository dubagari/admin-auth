import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { createProduct } from "../controllers/product.controller.js";

import {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Admin product management
router.post("/product", verifyAdmin, createProduct); // Create
router.get("/products", getProducts); // Get all
router.get("/product/:id", getProduct); // Get one
router.put("/product/:id", verifyAdmin, updateProduct); // Update
router.delete("/product/:id", verifyAdmin, deleteProduct); // Delete

export default router;
