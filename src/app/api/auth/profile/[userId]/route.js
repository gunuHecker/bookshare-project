import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "../../../utils";

// Get user profile
export async function GET(request, { params }) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const users = getUsers();
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
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
    const userId = params.userId;
    const body = await request.json();
    const { name, mobile, email } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if trying to change email to an already registered one
    if (email && email !== users[userIndex].email) {
      const emailExists = users.some(
        (user) => user.id !== userId && user.email === email
      );
      if (emailExists) {
        return NextResponse.json(
          { message: "Email already registered to another user" },
          { status: 400 }
        );
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      mobile: mobile || users[userIndex].mobile,
      email: email || users[userIndex].email,
      updatedAt: new Date().toISOString(),
    };

    saveUsers(users);

    // Remove password from response
    const { password, ...userWithoutPassword } = users[userIndex];

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: userWithoutPassword,
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
