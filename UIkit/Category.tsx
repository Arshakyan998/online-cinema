"use client";
import Link from "next/link";
import React from "react";

interface Props {
  category: Array<string | number>;
}

const Category: React.FC<Props> = ({ category }) => {

  // display: flex
  // ;
  //     align-items: center;
  //     align-content: center;
  //     gap: 12px 16px;
  //     flex-wrap: wrap;
  return (
    <ul className="flex items-center content-center flex-wrap gap-x-3 gap-y-4 ">
      {category.map((el) => {
        return (
          <li key={el}>
            <Link
              href="typescript:void(0)"
              className="text-[#F8F8FF] text-center text-sm font-normal leading-[130%]  rounded-3xl border-border-color bg-[#1B1B1B] border border-solid py-1.5 px-5"
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
