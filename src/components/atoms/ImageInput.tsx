import React from "react";

interface ImageInputProps {
  label: string;
  name: string;
  src: string;
  alt: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ label, name, src, alt }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="image" name={name} src={src} alt={alt} />
    </div>
  );
};

export default ImageInput;
