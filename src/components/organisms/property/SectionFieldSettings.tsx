import React from 'react';
import { Input, Form, Switch } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const SectionFieldSettings: React.FC = () => {


    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>

            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>

            <Form.Item label="Collapsible" name="isCollapsable">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default SectionFieldSettings;
