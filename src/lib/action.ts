"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { EditUserSchema, RegisterSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const register = async (prevState: any, formData: FormData) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      validatedFields.data
    );
  } catch (error: any) {
    return { message: error.response.data };
  }
  redirect("/login");
};

export const getAllContent = async (
  searchQuery: string,
  currentPage: number,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content?search=${searchQuery}&page=${currentPage}&limit=${limit}`
    );

    return response.data.data;
  } catch (error: any) {
    return { message: error.response.data };
  }
};
export const getAllContentByUser = async (
  searchQuery: string,
  currentPage: number,
  limit: number,
  token: string
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/my-content?search=${searchQuery}&page=${currentPage}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { message: error.response.data };
  }
};

export const getContentById = async (id: string, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/content/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return { message: error.response.data };
  }
};

export const getUserById = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return { message: error.response.data };
  }
};
