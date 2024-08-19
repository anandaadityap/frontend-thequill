import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, { message: "Name must be greater than 2" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be greater than 7" }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be greater than 7" }),
});

export const EditUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Name must be greater than 2" })
    .optional(),
  email: z.string().email().optional(),
  biodata: z.string().max(50).optional(),
});
