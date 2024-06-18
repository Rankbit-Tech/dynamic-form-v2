import React from 'react';

const PasswordFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                <input type="password" className="border p-1 rounded w-full" />
            </div>
        </div>
    );
};

export default PasswordFieldDesigner;
