import React from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface PasswordInputProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
        passwordRule?: boolean;
    };
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, validations }) => {
    const { required, passwordRule } = validations || {};

    const rules = [
        { required, message: `Please enter your ${label}` },
        ...(passwordRule ? [{
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Password must be at least 8 characters long and contain both letters and numbers'
        }] : [])
    ];

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.Password
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </Form.Item>
    );
};

export default PasswordInput;
