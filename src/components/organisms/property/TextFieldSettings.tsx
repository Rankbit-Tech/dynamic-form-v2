import React from 'react'
import { Checkbox, Flex, Form, Input, InputNumber } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import TextArea from 'antd/es/input/TextArea';
import DividerWithHeader from '@components/atoms/Divider';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';

const TextFieldSettings: React.FC = () => {
  const { handleValuesChange, values, handleCondition } = useSettingsForm();

  return (
    <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
      <Form.Item label="Label" name="label">
        <Input />
      </Form.Item>

      <Flex justify='space-between'>
        <Form.Item label="Font Size" name="fontSize">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Paragraph" name="paragraph">
          <TextArea rows={4} placeholder='Write here' />
        </Form.Item>
        <Form.Item label="Font Size" name="textColor">
          <Input placeholder='Eg.(blue or #1f2129)' />
        </Form.Item>
      </Flex>

      <Flex justify='space-between'>
        <Form.Item label="Bold" name="bold">
          <Checkbox>Required</Checkbox>
        </Form.Item>
        <Form.Item label="Italic" name="italic">
          <Checkbox>Italic</Checkbox>
        </Form.Item>
        <Form.Item label="Font Size" name="textColor">
          <Checkbox>Underline</Checkbox>
        </Form.Item>
      </Flex>

      <DividerWithHeader title="Validations" />
      <Form.Item name={['validations', 'required']} valuePropName="checked">
        <Checkbox>Required</Checkbox>
      </Form.Item>

      <DividerWithHeader title='Conditions' />
      <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
    </Form>
  )
}

export default TextFieldSettings;