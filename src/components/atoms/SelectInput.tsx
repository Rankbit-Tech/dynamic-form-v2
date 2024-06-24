import React from 'react';
import { Form, Select } from 'antd';

interface SelectInputProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, options }) => {
    return (
        <Form.Item label={label} name={name}>
            <Select>
                {options.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.label}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default SelectInput;
