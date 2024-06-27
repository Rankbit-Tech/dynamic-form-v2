import React from 'react';
import { Input, Form, DatePicker } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const DateTimeFieldSettings: React.FC = () => {
    const { handleValuesChange, values } = useSettingsForm();
    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
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
