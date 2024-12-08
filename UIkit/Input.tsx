import React from "react";
import * as Icons from "lucide-react";
import { Select } from "antd";
import { BaseOptionType } from "antd/es/select";
interface Props {
  onChange: (
    e: never[],
    option: BaseOptionType | BaseOptionType[] | undefined
  ) => void;
  value?: string;
  defaultValue?: string;
  icon?: keyof typeof Icons;
  data: BaseOptionType[];
}

const Input: React.FC<Props> = ({
  // defaultValue,
  onChange,
  //value,
  icon,
  data,
}) => {
  const Icon = icon && Icons[icon];
  return (
    <div
      className="relative px-3 py-4 border-none rounded-xl flex items-center"
      style={{
        background: "#212020",
      }}
    >
      <span>{Icon && <Icon />}</span>
      {/* <input
        className="w-[88%] border-none outline-none text-[#9EA2A8] text-xl  "
        value={getValue}
        style={{
          background: "transparent",
        }}
      /> */}
      <Select
        className="w-[88%] border-none outline-none text-[#9EA2A8] text-xl  bg-transparent"
        mode="multiple"
        allowClear
        placeholder="Please select"
        fieldNames={{
          value: "id",
          label: "genre",
        }}
        filterOption={(input, option) => {
          return option?.genre?.toLowerCase().includes(input.toLowerCase());
        }}
        dropdownStyle={{
          background: "#212020",
          color: "white",
        }}
        variant="filled"
        onChange={onChange}
        options={data}
      />
    </div>
  );
};

export default Input;
