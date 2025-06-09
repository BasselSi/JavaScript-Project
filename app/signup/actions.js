"use server";

import { SignupFormSchema } from "@/app/lib/schemas";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/user";
import { createSession } from "@/app/lib/sessions";

export async function signupAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  // Check if passwords match
  if (password !== repeatPassword) {
    return {
      errors: { passwordMatch: "Passwords do not match" },
      name,
      email,
    };
  }

  const validationResult = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      name,
      email,
    };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      errors: { email: "Email is already registered" },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id);
  console.log(`User ${user.name} created successfully.`);
  return { success: true };
}
