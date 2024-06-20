import React from 'react';
import { Input, Form, Switch } from 'antd';

const SectionFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Section Title">
                <Input />
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Collapsible">
                <Switch />
            </Form.Item>
            <Form.Item label="Default Collapsed">
                <Switch />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default SectionFieldSettings;
