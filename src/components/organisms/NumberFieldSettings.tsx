import React from 'react';
import { Input, Form, InputNumber } from 'antd';

const NumberFieldSettings: React.FC = () => {
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
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Minimum Value">
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Maximum Value">
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Step">
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default NumberFieldSettings;
