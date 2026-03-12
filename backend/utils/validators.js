import { body } from "express-validator";

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required")
];

export const requestValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("category").notEmpty().withMessage("Category required"),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High", "Critical"])
];