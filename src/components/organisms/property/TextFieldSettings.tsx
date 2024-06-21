import React, { useEffect } from 'react';
import { Input, Form, Checkbox, InputNumber, Flex } from 'antd';
import useSettingsForm, { isHandleValuesChangeObject } from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';

const TextFieldSettings: React.FC = () => {
    const result = useSettingsForm();

    if (React.isValidElement(result)) {
        return result;
    }

    if (!isHandleValuesChangeObject(result)) return null
    const { handleValuesChange, values } = result;

    const [form] = Form.useForm()


    return (
        <Form form={form} initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input />
            </Form.Item>
            {/* Validation settings */}
            <DividerWithHeader title='Validations' />

            <Form.Item initialValue={values?.validations.required} name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

            <Flex justify='space-between'>
                <Form.Item label="Min Length" name={['validations', 'minLength']}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Max Length" name={['validations', 'maxLength']}>
                    <InputNumber min={0} />
                </Form.Item>
            </Flex>

            <Form.Item label="Custom Validation Message" name={['validations', 'message']}>
                <Input.TextArea rows={3} />
            </Form.Item>
        </Form>
    );
};

export default TextFieldSettings;
