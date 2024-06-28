import React from 'react';
import { DatePicker, DatePickerProps, Form } from 'antd';

interface CustomDatePickerProps extends DatePickerProps {
    label: string;
    name: string
    validations: Record<string, any>
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, name, validations }) => {

    const { required } = validations || {}

    const rules = [
        { required, message: `Please select ${label}` }
    ]

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <DatePicker className='w-full' />
        </Form.Item>
    );
};

export default CustomDatePicker;
