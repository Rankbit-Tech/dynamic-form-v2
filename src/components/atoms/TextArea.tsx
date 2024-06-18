import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

interface CustomTextAreaProps extends TextAreaProps {
    label: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, ...textAreaProps }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-700">{label}</label>
            <Input.TextArea {...textAreaProps} />
        </div>
    );
};

export default CustomTextArea;
