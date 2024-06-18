import React from 'react';
import { Input, Form, Radio } from 'antd';

const RadioButtonFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Label">
                <Input />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Options">
                <Radio.Group>
                    <Radio value="option1">Option 1</Radio>
                    <Radio value="option2">Option 2</Radio>
                    <Radio value="option3">Option 3</Radio>
                </Radio.Group>
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default RadioButtonFieldSettings;
