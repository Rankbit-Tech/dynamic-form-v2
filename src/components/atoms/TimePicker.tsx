import React from 'react';
import { Form, TimePicker } from 'antd';

interface CustomTimePickerProps {
    label: string;
    name: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ label, name }) => {
    return (
        <Form.Item label={label} name={name} >
            <TimePicker />
        </Form.Item>
    );
};

export default CustomTimePicker;
