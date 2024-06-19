import React from 'react';

const TextAreaFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                <textarea className="border p-1 rounded w-full" rows={4}></textarea>
            </div>
        </div>
    );
};

export default TextAreaFieldDesigner;
