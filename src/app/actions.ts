"use server";

import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import type { LoginData, RegisterData } from "@/lib/schemas";

export async function register(data: RegisterData) {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data." };
  }

  await connectDB();

  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists." };
    }

    await User.create({
      email: data.email,
      password: data.password,
    });

    return { success: true, message: "Registration successful." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred during registration." };
  }
}

export async function login(data: LoginData) {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data.", user: null };
  }

  await connectDB();

  try {
    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user) {
      return { success: false, message: "Invalid credentials.", user: null };
    }

    const isPasswordMatch = await user.comparePassword(data.password);

    if (!isPasswordMatch) {
      return { success: false, message: "Invalid credentials.", user: null };
    }

    return { success: true, message: "Login successful.", user: { email: user.email } };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred during login.", user: null };
  }
}
