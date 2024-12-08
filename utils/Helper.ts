import React, { ReactHTML } from "react";

export class Helper {
  static addVirgule = <T extends object | string>(
    arr: T[],
    key: keyof T,
    tag: keyof ReactHTML = "span",
    className?: string
  ) => {
    return arr?.map((el, i) => {
      const content = (typeof el === "object" ? el[key] : el) as string;

      if (!content) return null;
      const contentWithVirgule =
        content + "" + (i === arr.length - 1 ? " " : ", ");

      return React.createElement(
        tag,
        { className, key: content },
        contentWithVirgule
      );
    });
  };

  static createPagination = ({
    total,
    pageCount,
  }: {
    total: number;
    pageCount: number;
  }) => {
    return new Array(total / pageCount).map((_, i) => i + 1);
  };
}
