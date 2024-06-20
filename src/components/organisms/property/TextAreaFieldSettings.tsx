import React from 'react';
import { Input, Form } from 'antd';

const { TextArea } = Input;

const TextAreaFieldSettings: React.FC = () => {
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
            <Form.Item label="Default Value">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Rows">
                <Input />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default TextAreaFieldSettings;
