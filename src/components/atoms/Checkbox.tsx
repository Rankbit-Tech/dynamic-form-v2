import React from 'react';
import { Checkbox, Form } from 'antd';
import { Rule } from 'antd/lib/form';

interface CheckBoxProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
    };
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, name, validations }) => {
    const { required } = validations || {};

    const rules: Rule[] = [
        { required, message: `Please check the ${label}` },
    ].filter(rule => rule.required);

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Checkbox />
        </Form.Item>
    );
};

export default CheckBox;
