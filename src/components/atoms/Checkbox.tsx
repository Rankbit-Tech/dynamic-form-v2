import React from 'react';
import { Checkbox, CheckboxProps, Form } from 'antd';

interface CheckBoxProps extends CheckboxProps {
    label: string;
    name: string
    options: {
        label: string
        value: string
    }[]
    validations: Record<string, any>
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, options, name, validations }) => {

    const { required } = validations || {}

    const rules = [
        { required, message: `Please select ${label}` }
    ]

    return (
        <Form.Item label={label} name={name} rules={rules} valuePropName="checked">
            <Checkbox.Group
                options={options}
            />
        </Form.Item>
    );
};

export default CheckBox;
