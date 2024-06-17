import React from "react";

interface FileInputProps {
  label: string;
  name: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="file" name={name} />
    </div>
  );
};

export default FileInput;
