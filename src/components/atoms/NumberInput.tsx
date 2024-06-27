import React from 'react';
import { Form, InputNumber, FormItemProps } from 'antd';

interface NumberInputProps {
    label: string;
    name: string;
    validations: {
        required: boolean;
        min?: number;
        max?: number;
        numberRule?: boolean;
    };
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, validations }) => {
    const { required, min, max, numberRule } = validations || {};

    const rules: FormItemProps['rules'] = [
        { required, message: `Please enter your ${label}` },
        ...(min !== undefined ? [{
            validator: (_: any, value: number) =>
                value === undefined || value >= min ? Promise.resolve() : Promise.reject(new Error(`Minimum value is ${min}`))
        }] : []),
        ...(max !== undefined ? [{
            validator: (_: any, value: number) =>
                value === undefined || value <= max ? Promise.resolve() : Promise.reject(new Error(`Maximum value is ${max}`))
        }] : []),
        ...(numberRule ? [{
            validator: (_: any, value: any) =>
                typeof value === 'number' ? Promise.resolve() : Promise.reject(new Error('Please enter a valid number'))
        }] : [])
    ];

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <InputNumber className='w-full' />
        </Form.Item>
    );
};

export default NumberInput;
