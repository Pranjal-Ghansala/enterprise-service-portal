import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus
} from "../controllers/request.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { requestValidator } from "../utils/validators.js";

const router = express.Router();

// All routes require login
router.use(protect);

// Get all requests
router.get("/", getRequests);

// Create new request (user or admin)
router.post("/", requestValidator, createRequest);

// Get single request
router.get("/:id", getRequestById);

// ONLY ADMIN can update status
router.patch("/:id", adminOnly, updateRequestStatus);

export default router;