import React from 'react';
import { Input, Form, Switch } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const StepperFieldSettings: React.FC = () => {

    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="Collapse" name="isCollapse">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default StepperFieldSettings;
