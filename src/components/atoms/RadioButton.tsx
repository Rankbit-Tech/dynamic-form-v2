import React from 'react';
import { Radio, RadioProps } from 'antd';


interface RadioButtonProps extends RadioProps {
    label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, ...radioProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <Radio {...radioProps} />
            <label className="text-gray-700">{label}</label>
        </div>
    );
};

export default RadioButton;
