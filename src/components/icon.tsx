import Link from "next/link";
import React from "react";
import { GiQuillInk } from "react-icons/gi";

const Icon = () => {
  return (
    <Link
      href="/"
      className="flex"
    >
      <h1 className="text-4xl font-bold">TheQuill</h1>
      <GiQuillInk className=" font-bold text-4xl" />
    </Link>
  );
};

export default Icon;
