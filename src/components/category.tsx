import { Group } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <Group className="mb-5">
      <Link
        href="/"
        className="hover:text-slate-500"
      >
        For you
      </Link>
      <Link
        href="/"
        className="hover:text-slate-500"
      >
        Technology
      </Link>
      <Link
        href="/"
        className="hover:text-slate-500"
      >
        Science
      </Link>
      <Link
        href="/"
        className="hover:text-slate-500"
      >
        Math
      </Link>
      <Link
        href="/"
        className="hover:text-slate-500"
      >
        Biology
      </Link>
    </Group>
  );
};

export default Category;
