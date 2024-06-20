import React from 'react';
import { Input, Form, InputNumber } from 'antd';

const StepperFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Min Value">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Max Value">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Step">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Default Value">
                <InputNumber />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default StepperFieldSettings;
