import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import requestRoutes from "./routes/request.routes.js";

import { errorHandler, notFound } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/* ----------------------------- SECURITY ----------------------------- */

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

/* ----------------------------- BODY PARSER ----------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------------------- DATABASE ----------------------------- */

connectDB();

/* ----------------------------- ROUTES ----------------------------- */

app.get("/", (req, res) => {
  res.json({
    message: "Enterprise Service Request Portal API"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

/* ----------------------------- ERROR HANDLING ----------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ----------------------------- SERVER ----------------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});