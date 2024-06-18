import React from 'react';
import { Input, Form, Checkbox } from 'antd';

const CheckboxFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Default Checked">
                <Checkbox />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default CheckboxFieldSettings;
