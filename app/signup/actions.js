"use server";

import { SignupFormSchema } from "@/app/lib/schemas";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/user";
import { createSession } from "@/app/lib/sessions";

export async function signupAction(prevState, formData) {
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validationResult.data;

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
  return { success: true };
}
