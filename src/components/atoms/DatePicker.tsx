import React from 'react';
import { DatePicker, DatePickerProps, Form } from 'antd';
import { RuleObject } from 'rc-field-form/lib/interface';
import { StoreValue } from 'rc-field-form/lib/interface';

interface CustomDatePickerProps extends DatePickerProps {
    label: string;
    name: string;
    placeholder?: string;
    validations?: {
        required?: boolean;
        notPastDate?: boolean;
    };
}


const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, name, validations }) => {
    const { required, notPastDate } = validations || {};

    const validateDate = async (_: RuleObject, value: StoreValue) => {
        if (notPastDate && value && value < new Date().setHours(0, 0, 0, 0)) {
            throw new Error('The date cannot be in the past.');
        }
    };

    const rules = [
        { required, message: `Please select a ${label}` },
        { validator: validateDate },
    ].filter(rule => rule.required || rule.validator);


    return (
        <Form.Item label={label} name={name} rules={rules}>
            <DatePicker className='w-full' />
        </Form.Item>
    );
};

export default CustomDatePicker