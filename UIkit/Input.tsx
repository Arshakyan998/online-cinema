import { BaseOptionType } from 'antd/es/select';
import * as Icons from 'lucide-react';
import { Select } from 'antd';
import React from 'react';
interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  icon?: keyof typeof Icons;
  placeholder?: string;
}

const Input: React.FC<Props> = ({
  defaultValue,
  onChange,
  value,
  icon,
  placeholder,
}) => {
  const Icon = icon && Icons[icon];

  const getValue = value || defaultValue;

  return (
    <div
      className="relative px-3 py-4 border-none rounded-xl flex items-center"
      style={{
        background: '#212020',
      }}
    >
      <span>{Icon && <Icon />}</span>
      <input
        className="w-full border-none outline-none text-medium-gray text-xl  bg-transparent"
        value={getValue}
        onChange={onChange}
        placeholder={placeholder}
      />
      {/* <Select
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
      /> */}
    </div>
  );
};

export default Input;
