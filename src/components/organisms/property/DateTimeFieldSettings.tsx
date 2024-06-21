import React from 'react';
import { Input, Form, DatePicker } from 'antd';

const DateTimeFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>

            <Form.Item label="Default Value">
                <DatePicker showTime />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default DateTimeFieldSettings;
