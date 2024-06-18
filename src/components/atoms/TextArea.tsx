import React from 'react';
import { Input, InputProps } from 'antd';

interface PasswordInputProps extends InputProps {
    label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ...inputProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}</label>
            <Input.Password {...inputProps} />
        </div>
    );
};

export default PasswordInput;
