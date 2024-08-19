"use client";

import { Button } from "@mantine/core";
import { useFormStatus } from "react-dom";

interface AuthButtonProps {
  type: "Register" | "Login";
}

export const AuthButton = ({ type }: AuthButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="mt-5 w-full"
      loading={pending}
      loaderProps={{ type: "dots" }}
    >
      {type}
    </Button>
  );
};
