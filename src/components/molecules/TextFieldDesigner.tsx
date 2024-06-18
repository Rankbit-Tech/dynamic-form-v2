import React from 'react';

interface TextFieldDesignerProps {
    label: string
    placeholder: string
    name: string
}

const TextFieldDesigner = ({ label, placeholder, name }: TextFieldDesignerProps) => {
    return (
        <div className="p-2 my-1 border rounded bg-white shadow">
            <label>{label}</label>
            <input readOnly disabled placeholder={placeholder} type="text" className="mt-1 p-2 border rounded w-full" />
        </div>
    );
};

export default TextFieldDesigner;
