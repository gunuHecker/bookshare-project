import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["owner", "seeker"],
      default: "seeker",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // This will automatically add and manage createdAt and updatedAt fields
    timestamps: true,
  }
);

// Check if the model is already defined to prevent overwriting during hot reloads
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
