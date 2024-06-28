import React from 'react';
import { Input, Form, Checkbox } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';

const DateTimeFieldSettings: React.FC = () => {

    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>

            <DividerWithHeader title='Validations' />

            <Form.Item initialValue={values?.validations.required} name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>
        </Form>
    );
};

export default DateTimeFieldSettings;
