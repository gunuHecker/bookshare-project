import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    const body = await request.json();
    const { name, mobile, email, password, role } = body;

    // Validate required fields
    if (!name || !mobile || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== "owner" && role !== "seeker") {
      return NextResponse.json(
        { message: "Role must be either owner or seeker" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Remove password from response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      mobile: newUser.mobile,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Server error during registration" },
      { status: 500 }
    );
  }
}
