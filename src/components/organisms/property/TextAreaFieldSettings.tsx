import React from 'react';
import { Input, Form, Checkbox, Flex, InputNumber } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';

const { TextArea } = Input;

const TextAreaFieldSettings: React.FC = () => {
    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input />
            </Form.Item>
            <Form.Item label="Default Value" name="defaultValue">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Rows" name="rows">
                <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Cols" name="cols">
                <Input type="number" min={1} />
            </Form.Item>

            <Flex justify='space-between'>
                <Form.Item label="Min Length" name={['validations', 'minLength']}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Max Length" name={['validations', 'maxLength']}>
                    <InputNumber />
                </Form.Item>
            </Flex>

            <DividerWithHeader title='Validations' />

            <Form.Item initialValue={values?.validations.required} name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>
        </Form>
    );
};

export default TextAreaFieldSettings;
