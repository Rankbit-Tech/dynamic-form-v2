import React from "react";

interface SearchInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="search"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
