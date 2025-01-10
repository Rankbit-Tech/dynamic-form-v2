import React from 'react';
import { Form, InputNumber } from 'antd';

interface NumberInputProps {
    label: string;
    name: string;
    placeholder: string;
    defaultValue: number;
    disabled: boolean;
    step: number;
    showControls: boolean;
    validations?: {
        required?: boolean;
        disabled: boolean;
        minValue?: number;
        maxValue?: number;
    };
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, disabled, showControls, defaultValue, step, placeholder, validations }) => {

    const { required, minValue, maxValue, disabled: validation_disabled } = validations || {}
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
                disabled={disabled || validation_disabled}
                placeholder={placeholder}
                controls={showControls}
                stringMode={false}
                onKeyDown={handleKeyPress}
                className='w-full' />
        </Form.Item>
    );
};

export default NumberInput;
