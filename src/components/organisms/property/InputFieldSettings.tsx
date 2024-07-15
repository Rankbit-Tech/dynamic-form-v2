import React from 'react';
import { Input, Form, Checkbox, InputNumber, Flex } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';

const InputFieldSettings: React.FC = () => {

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
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
            <Flex justify='space-between'>
                <Form.Item initialValue={values?.validations.required} name={['validations', 'required']} valuePropName="checked">
                    <Checkbox>Required</Checkbox>
                </Form.Item>
                <Form.Item initialValue={values?.validations.disabled} name={['validations', 'disabled']} valuePropName="checked">
                    <Checkbox>Disable</Checkbox>
                </Form.Item>
            </Flex>


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

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    );
};

export default InputFieldSettings;
