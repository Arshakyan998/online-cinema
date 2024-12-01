"use client";
import Link from "next/link";
import React from "react";

interface Props {
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  isLink?: boolean;
  href?: string;
  text?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  isLink,
  href,
  text = "Смотерть",
}) => {
  const Component = isLink ? Link : "button";

  const props = isLink ? { href } : { onClick };

  return (
    <Component
      className="cus-btn primary flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-center"
      {...props}
    >
      <i className="far fa-play"></i> {text}
    </Component>
  );
};
export default Button;
