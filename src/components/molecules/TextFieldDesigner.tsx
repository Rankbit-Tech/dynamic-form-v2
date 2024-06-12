import React from 'react';

const TextFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <input type="text" className="mt-1 p-2 border rounded w-full" />
        </div>
    );
};

export default TextFieldDesigner;
