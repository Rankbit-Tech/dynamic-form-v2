import React from "react";

interface DateInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="date"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DateInput;
