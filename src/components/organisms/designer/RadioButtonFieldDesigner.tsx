import React from 'react';

const RadioButtonFieldDesigner: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input type="radio" id={option} name={label} className="mr-2" />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioButtonFieldDesigner;
