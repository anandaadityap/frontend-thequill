import AuthWrapper from "@/components/auth/auth-wrapper";
import RegisterForm from "@/components/auth/register-form";
import React from "react";
import { GiQuillInk } from "react-icons/gi";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <AuthWrapper
        title="Become a Member"
        subtitle="Sign up and be part of a growing community."
        footer="Have an account?"
        route="login"
      >
        <RegisterForm />
      </AuthWrapper>
    </div>
  );
};

export default Register;
