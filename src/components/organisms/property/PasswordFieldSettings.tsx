import React from 'react';
import { Input, Form, InputNumber } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const PasswordFieldSettings: React.FC = () => {
    const { handleValuesChange, values } = useSettingsForm();

    if (!values) {
        return null; 
    }

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Default Value" name="defaultValue">
                <Input.Password />
            </Form.Item>
            <Form.Item label="Min Length" name="minLength">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Max Length" name="maxLength">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Pattern" name="pattern">
                <Input />
            </Form.Item>
        </Form>
    );
};

export default PasswordFieldSettings;
