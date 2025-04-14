import mongoose from "mongoose";

const SavedBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    savedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a user can only save a book once
SavedBookSchema.index({ userId: 1, bookId: 1 }, { unique: true });

// Check if the model is already defined to prevent overwriting during hot reloads
const SavedBook = mongoose.models.SavedBook || mongoose.model("SavedBook", SavedBookSchema);

export default SavedBook; 