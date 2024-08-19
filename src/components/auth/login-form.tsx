"use client";

import { useFormState } from "react-dom";
import { AuthButton } from "../Button";
import axios from "axios";
import { useTokenStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/schema";

const LoginForm = () => {
  const { setToken } = useTokenStore();
  const router = useRouter();

  const handleLogin = async (prevState: any, formData: FormData) => {
    const validatedFields = LoginSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        validatedFields.data,
        { withCredentials: true }
      );

      setToken(response.data.data.access_token);
    } catch (error: any) {
      return { message: error.response };
    }
    router.push("/");
  };
  const [state, formAction] = useFormState(handleLogin, null);

  return (
    <form action={formAction}>
      <div
        id="name-error"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="mt-2 text-sm text-red-500 text-center">
          {state?.message?.message}
        </p>
      </div>

      <div className="mb-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          className="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div
          id="name-error"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div
          id="name-error"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 text-sm text-red-500">{state?.Error?.password}</p>
        </div>
      </div>

      <AuthButton type="Login" />
    </form>
  );
};

export default LoginForm;
