import React from 'react';

const NumberFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <div className="mt-5">
                <label>{label}</label>
                <input type="number" className="border p-1 rounded w-full" />
            </div>
        </div>
    );
};

export default NumberFieldDesigner;
