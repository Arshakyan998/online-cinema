import React from "react";

interface Props {
  tags: Array<string | number>;
}

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <ul className="flex items-center gap-3 text-sm font-semibold text-white mb-4">
      {tags.map((el) => (
        <li className="border border-white px-2 py-1 rounded-md" key={el}>
          {el}
        </li>
      ))}
    </ul>
  );
};
export default Tags;
