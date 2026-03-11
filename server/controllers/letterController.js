import Letter from "../models/Letter.js";
import { validationResult } from "express-validator";

// @desc    Create a new letter
// @route   POST /api/letters
export const createLetter = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, author } = req.body;

    const letter = await Letter.create({
      content,
      author: author || "Anonymous",
    });

    res.status(201).json({
      success: true,
      data: letter,
    });
  } catch (error) {
    console.error("Error creating letter:", error);
    res.status(500).json({
      success: false,
      message: "Error creating letter",
      error: error.message,
    });
  }
};

// @desc    Get all letters (with pagination)
// @route   GET /api/letters
export const getLetters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const letters = await Letter.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await Letter.countDocuments({ isPublic: true });

    res.json({
      success: true,
      data: letters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching letters:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching letters",
      error: error.message,
    });
  }
};

// @desc    Get random letter
// @route   GET /api/letters/random
export const getRandomLetter = async (req, res) => {
  try {
    const count = await Letter.countDocuments({ isPublic: true });

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "No letters found",
      });
    }

    const random = Math.floor(Math.random() * count);
    const letter = await Letter.findOne({ isPublic: true })
      .skip(random)
      .select("-__v");

    res.json({
      success: true,
      data: letter,
    });
  } catch (error) {
    console.error("Error fetching random letter:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching random letter",
      error: error.message,
    });
  }
};

// @desc    Get single letter by ID
// @route   GET /api/letters/:id
export const getLetterById = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id).select("-__v");

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: "Letter not found",
      });
    }

    res.json({
      success: true,
      data: letter,
    });
  } catch (error) {
    console.error("Error fetching letter:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching letter",
      error: error.message,
    });
  }
};

// @desc    Like a letter
// @route   POST /api/letters/:id/like
export const likeLetter = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: "Letter not found",
      });
    }

    // For now, just increment likes count (no user auth yet)
    letter.likesCount += 1;
    await letter.save();

    res.json({
      success: true,
      data: { likesCount: letter.likesCount },
    });
  } catch (error) {
    console.error("Error liking letter:", error);
    res.status(500).json({
      success: false,
      message: "Error liking letter",
      error: error.message,
    });
  }
};
