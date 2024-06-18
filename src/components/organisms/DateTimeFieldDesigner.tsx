import React from 'react';

const DateTimeFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                <input type="datetime-local" className="border p-1 rounded w-full" />
            </div>
        </div>
    );
};

export default DateTimeFieldDesigner;
