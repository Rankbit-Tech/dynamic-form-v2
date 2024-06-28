import React from 'react';
import { Form, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

interface CustomTextAreaProps extends TextAreaProps {
    label: string;
    name: string
    validations: Record<string, any>
    placeholder: string
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, name, validations, placeholder }) => {

    const { required, minLength, maxLength } = validations || {}

    const rules = [
        { required, message: `Please enter ${label}` },
        { min: minLength, message: `Minimum length is should be ${minLength}` },
        { max: maxLength, message: `Maximun length is should be ${maxLength}` }
    ].filter(rule => rule.required || rule.min !== undefined || rule.max !== undefined);
    console.log(rules)
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.TextArea placeholder={placeholder} />
        </Form.Item>
    );
};

export default CustomTextArea;
