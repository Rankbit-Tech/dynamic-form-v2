import React from 'react';
import { Input, Form, Switch } from 'antd';
import useSettingsForm, { isHandleValuesChangeObject } from '@hooks/useSettingsForm';

const StepperFieldSettings: React.FC = () => {

    const result = useSettingsForm();

    if (React.isValidElement(result)) {
        return result;
    }

    if (!isHandleValuesChangeObject(result)) return null
    const { handleValuesChange, values } = result;

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
