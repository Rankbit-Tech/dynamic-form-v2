import React from 'react';
import { Input, Form, Switch } from 'antd';
import useSettingsForm, { isHandleValuesChangeObject } from '@hooks/useSettingsForm';

const SectionFieldSettings: React.FC = () => {

    const result = useSettingsForm();

    if (React.isValidElement(result)) {
        return result;
    }

    if (!isHandleValuesChangeObject(result)) return null
    const { handleValuesChange, values } = result;

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>

            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>

            <Form.Item label="Number of Columns" name="cols">
                <Input type="number" min={1} max={12} />
            </Form.Item>
            <Form.Item label="Collapsible" name="isCollapsable">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default SectionFieldSettings;
