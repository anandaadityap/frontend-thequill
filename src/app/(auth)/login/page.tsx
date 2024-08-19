import AuthWrapper from "@/components/auth/auth-wrapper";
import LoginForm from "@/components/auth/login-form";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <AuthWrapper
        title="Welcome back!"
        subtitle="Log in to continue exploring the latest."
        footer="Don't have an account?"
        route="register"
      >
        <LoginForm />
      </AuthWrapper>
    </div>
  );
};

export default Login;
