import React from 'react';
import { Form, Input } from 'antd';

interface CustomTextAreaProps {
    label: string;
    name: string;
    placeholder?: string;
    validations: {
        required: boolean;
        maxLength?: number;
    };
}

const { TextArea } = Input;

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, name, placeholder, validations }) => {
    const { required, maxLength } = validations || {};

    const rules = [
        { required, message: `Please enter your ${label}` },
        { max: maxLength, message: `Maximum length is ${maxLength} characters` },
    ].filter(rule => rule.required || rule.max !== undefined);

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <TextArea placeholder={placeholder} maxLength={maxLength} />
        </Form.Item>
    );
};

export default CustomTextArea;
