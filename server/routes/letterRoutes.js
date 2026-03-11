import express from "express";
import { body } from "express-validator";
import {
  createLetter,
  getLetters,
  getRandomLetter,
  getLetterById,
  likeLetter,
} from "../controllers/letterController.js";

const router = express.Router();

// Validation rules
const letterValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Letter content is required")
    .isLength({ max: 5000 })
    .withMessage("Letter cannot exceed 5000 characters"),
  body("author")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Author name cannot exceed 50 characters"),
];

// Routes
router.route("/").get(getLetters).post(letterValidation, createLetter);

router.get("/random", getRandomLetter);
router.get("/:id", getLetterById);
router.post("/:id/like", likeLetter);

export default router;
