import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import User from "@/models/User";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Book from "@/models/Book";

// Get user profile
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Format user response
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: userResponse }, { status: 200 });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { message: "Server error while getting user profile" },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PUT(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    const userId = params.userId;
    const body = await request.json();
    const { name, mobile, email } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if trying to change email to an already registered one
    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        _id: { $ne: userId },
        email,
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "Email already registered to another user" },
          { status: 400 }
        );
      }
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (email) user.email = email;

    // Save the updated user
    await user.save();

    // Format user response
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: "Server error while updating profile" },
      { status: 500 }
    );
  }
}

// Delete user account
export async function DELETE(request, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    const userId = params.userId;
    const body = await request.json();
    const { password } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If password is provided, verify it for extra security
    if (password) {
      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      }
    }

    // Delete all books owned by this user
    await Book.deleteMany({ ownerId: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { message: "Server error while deleting account" },
      { status: 500 }
    );
  }
}
