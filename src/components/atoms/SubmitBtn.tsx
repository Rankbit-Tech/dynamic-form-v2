import React from "react";

interface ResetInputProps {
  label: string;
}

const SubmitBtn: React.FC<ResetInputProps> = ({ label }) => {
  return (
    <div>
      <input type="submit" value={label} />
    </div>
  );
};

export default SubmitBtn;
