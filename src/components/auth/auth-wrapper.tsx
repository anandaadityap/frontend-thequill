import Link from "next/link";
import React from "react";
import Icon from "../icon";

interface AuthWrapperProps {
  children: React.ReactNode;
  subtitle: string;
  title: string;
  footer: string;
  route: string;
}

const AuthWrapper = ({
  children,
  title,
  subtitle,
  footer,
  route,
}: AuthWrapperProps) => {
  return (
    <div className="w-[400px] shadow-lg p-10">
      <div className="mb-2">
        <Icon />
      </div>
      <div className="mb-2">
        <p className="text-2xl">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </div>
      <div>{children}</div>
      <div className="flex justify-center mt-2">
        <Link
          href={`/${route}`}
          className="hover:text-black/70"
        >
          {footer}
        </Link>
      </div>
    </div>
  );
};

export default AuthWrapper;
