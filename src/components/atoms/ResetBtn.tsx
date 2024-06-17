import React from "react";

interface ResetInputProps {
  label: string;
}

const ResetInput: React.FC<ResetInputProps> = ({ label }) => {
  return (
    <div>
      <input type="reset" value={label} />
    </div>
  );
};

export default ResetInput;
