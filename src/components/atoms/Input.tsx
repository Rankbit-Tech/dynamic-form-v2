import React from "react";
import { Input, InputProps } from "antd";

interface InputFieldProps extends InputProps {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  ...inputProps
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-700">{label}</label>
      <Input {...inputProps} />
    </div>
  );
};

export default InputField;
