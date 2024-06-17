import React from "react";

interface TimeInputProps {
  label: string;
  value: string;
  name: string;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="time" name={name} defaultValue={value} />
    </div>
  );
};

export default TimeInput;
