import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    contactInfo: {
      type: String,
      required: [true, "Contact information is required"],
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "exchanged"],
      default: "available",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // This will automatically add and manage createdAt and updatedAt fields
    timestamps: true,
    // Ensure we use 'books' as the collection name regardless of model name
    collection: "books",
  }
);

// Check if the model is already defined to prevent overwriting during hot reloads
let Book;
try {
  // Try to get existing model first
  Book = mongoose.model("Book");
} catch (e) {
  // Model doesn't exist yet, so create it
  Book = mongoose.model("Book", BookSchema);
}

export default Book;
