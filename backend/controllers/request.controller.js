import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ServiceRequest from "../models/request.model.js";

export const createRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const request = await ServiceRequest.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const getRequests = async (req, res, next) => {
  try {

    const { status, category, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    

    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    if (status) filter.status = status;
    if (category) filter.category = category;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const requests = await ServiceRequest.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await ServiceRequest.countDocuments(filter);

    res.json({
      data: requests,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const request = await ServiceRequest.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    /* USER PERMISSION CHECK */

    if (
      req.user.role !== "admin" &&
      request.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this request"
      });
    }

    request.status = status;
    request.updatedAt = new Date();

    await request.save();

    res.json({
      message: "Request status updated",
      request
    });

  } catch (error) {
    next(error);
  }
};