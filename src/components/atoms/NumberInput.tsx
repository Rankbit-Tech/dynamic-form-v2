import React from 'react';
import { Form, InputNumber, InputNumberProps } from 'antd';

interface NumberInputProps {
    label: string;
    name: string
    placeholder: string
    defaultValue: number,
    step: number
    showControls: boolean
    validations?: {
        required?: boolean;
        minValue?: number;
        maxValue?: number;
    };
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, showControls, defaultValue, step, placeholder, validations }) => {

    const { required, minValue, maxValue, } = validations || {}
    const rules = [
        { required, message: `Please enter ${label}` }
    ].filter(rule => rule.required);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (allowedKeys.includes(e.key)) {
            return;
        }
        if (!/^\d*\.?\d*$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <Form.Item label={label} name={name} initialValue={defaultValue} rules={rules}>
            <InputNumber
                step={step}
                min={minValue}
                max={maxValue}
                placeholder={placeholder}
                controls={showControls}
                stringMode={false}
                onKeyDown={handleKeyPress}
                className='w-full' />
        </Form.Item>
    );
};

export default NumberInput;
