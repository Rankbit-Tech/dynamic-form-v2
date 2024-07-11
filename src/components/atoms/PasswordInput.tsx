import React from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface PasswordInputProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
        pattern?: string[];
        minLength?: number;
        maxLength?: number;
    };
}
interface patternRulesType {
    number: string;
    alphabet: string;
    specialCharacter: string;
}
enum patternRules {
    number="(?=.*[0-9])",
    alphabet="(?=.*[a-zA-Z])",
    specialCharacter="(?=.*[!@#$%^&*])"
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, validations }) => {
    const { required, pattern, minLength, maxLength } = validations || {};
    let regExpression = "" as string;
    pattern?.forEach((p:string) => {
        regExpression += patternRules[p as keyof patternRulesType];
    })

    const rules = [
        { required, message: `Please enter your ${label}` },
        ...(pattern ? [{
            pattern: new RegExp(regExpression),
            message: 'Password does not meet the required criteria',
        }] : []),
        { min: minLength, message: `Minimum length is should be ${minLength}` },
        { max: maxLength, message: `Maximun length is should be ${maxLength}` }
    ].filter(rule => rule.required || rule.pattern !== undefined || rule.min !== undefined || rule.max !== undefined);

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.Password
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </Form.Item>
    );
};

export default PasswordInput;
