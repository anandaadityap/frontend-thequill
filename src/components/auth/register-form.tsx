"use client";
import { register } from "@/lib/action";

import { useFormState } from "react-dom";
import { AuthButton } from "../Button";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, null);

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
          htmlFor="username"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border rounded-md bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div
          id="name-error"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 text-sm text-red-500">{state?.Error?.username}</p>
        </div>
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

      <AuthButton type="Register" />
    </form>
  );
};

export default RegisterForm;
