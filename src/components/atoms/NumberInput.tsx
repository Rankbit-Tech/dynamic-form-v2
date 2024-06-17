import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';

interface NumberInputProps extends InputNumberProps {
    label: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, ...inputNumberProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}</label>
            <InputNumber {...inputNumberProps} />
        </div>
    );
};

export default NumberInput;
