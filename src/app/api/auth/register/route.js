import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "@/app/api/utils";

export async function POST(request) {
  try {
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

    const users = getUsers();

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      mobile,
      email,
      password, // In a real app, this would be hashed
      role,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
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
