import { InputNumber } from 'antd';
import React from 'react';

const NumberFieldDesigner: React.FC<{ label: string, placeholder: string }> = ({ label, placeholder }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <div className="mt-5">
                <label>{label}</label>
                <InputNumber placeholder={placeholder} className="border p-1 rounded w-full" />
            </div>
        </div>
    );
};

export default NumberFieldDesigner;
