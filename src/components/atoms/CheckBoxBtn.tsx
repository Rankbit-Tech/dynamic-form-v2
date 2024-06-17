import React from 'react';

interface CheckBoxProps {
  type: string;
  label: string;
  isChecked: boolean;
  name: string;
}

const CheckBoxBtn: React.FC<CheckBoxProps> = ({ type, label, isChecked, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="checkbox" name={name} defaultChecked={isChecked} />
    </div>
  );
};

export default CheckBoxBtn;
