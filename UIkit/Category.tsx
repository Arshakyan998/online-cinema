"use client";
import Link from "next/link";
import React from "react";

interface Props {
  category: Array<string | number>;
}

const Category: React.FC<Props> = ({ category }) => {
  return (
    <ul className="flex items-center content-center flex-wrap gap-4">
      {category.map((el) => {
        return (
          <li key={el}>
            <Link
              href="typesscript:void(0)"
              className="text-white text-sm font-normal   rounded-3xl border-black border border-solid px-6 py-20"
            >
              {el}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Category;
