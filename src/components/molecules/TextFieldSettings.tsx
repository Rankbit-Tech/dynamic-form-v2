import React from 'react';
import { Input, Form } from 'antd';

const TextFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder">
                <Input />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default TextFieldSettings;
