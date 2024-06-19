import React from 'react';
import { Input, Form } from 'antd';

const SelectFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            {/* Add more settings specific to select fields */}
        </Form>
    );
};

export default SelectFieldSettings;
