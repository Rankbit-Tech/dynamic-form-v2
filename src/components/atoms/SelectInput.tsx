import React from 'react';
import { Form, Select } from 'antd';

interface SelectInputProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    defaultValue: SelectInputProps['options'][number]['value']
    validations: Record<string, any>
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, options, defaultValue, validations }) => {

    const transformOptions = [{ label: `Select ${label}`, value: '' }, ...options]

    const { required } = validations || {}
    const rules = [
        { required, message: `Please select ${label || 'any value'}` },

    ].filter(rule => rule.required);

    return (
        <Form.Item label={label} initialValue={defaultValue} name={name} rules={rules}>
            <Select
                options={transformOptions}
            />
        </Form.Item>
    );
};

export default SelectInput;
