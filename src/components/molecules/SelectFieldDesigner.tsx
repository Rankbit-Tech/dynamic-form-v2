import React from 'react';

const SelectFieldDesigner: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <select className="mt-1 p-2 border rounded w-full">
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFieldDesigner;
