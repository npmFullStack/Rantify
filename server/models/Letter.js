import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Letter content is required"],
      trim: true,
      maxlength: [5000, "Letter cannot exceed 5000 characters"],
    },
    author: {
      type: String,
      default: "Anonymous",
      trim: true,
      maxlength: [50, "Author name cannot exceed 50 characters"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Index for better query performance
letterSchema.index({ createdAt: -1 });
letterSchema.index({ likesCount: -1 });

const Letter = mongoose.model("Letter", letterSchema);

export default Letter;
