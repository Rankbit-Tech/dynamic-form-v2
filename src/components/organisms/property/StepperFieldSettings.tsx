import React from 'react';
import { Input, Form, Switch } from 'antd';

const StepperFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Title">
                <Input />
            </Form.Item>
            <Form.Item label="Collapse">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default StepperFieldSettings;
