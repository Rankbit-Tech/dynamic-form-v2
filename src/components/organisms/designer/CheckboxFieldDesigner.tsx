import React from 'react';

interface CheckboxFieldDesignerProps {
    label: string;
    options?: string[];
}

const CheckboxFieldDesigner: React.FC<CheckboxFieldDesignerProps> = ({ label, options = [] }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                {options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input type="checkbox" id={option} name={label} className="mr-2" />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxFieldDesigner;
