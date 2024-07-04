import React from 'react';
import { Form, Input } from 'antd';

interface CustomTextFieldProps {
    label: string;
    name: string
    validations: Record<string, any>
    placeholder: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, name, placeholder }) => {

    return (
        <Form.Item label={label} name={name}>
            <Input.TextArea />
        </Form.Item>
    );
};

export default CustomTextField;
