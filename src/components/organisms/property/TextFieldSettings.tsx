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
      <Form.Item label="Paragraph" name="paragraph">
        <TextArea rows={4} placeholder='Write here' />
      </Form.Item>

      <Flex justify='space-between' gap={2}>
        <Form.Item label="Font Size" name="fontSize">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Font Color" name="textColor">
          <Input placeholder='Eg.(blue or #1f2129)' />
        </Form.Item>
      </Flex>

      <Flex justify='space-between'>
        <Form.Item initialValue={values?.bold} name='bold' valuePropName="checked">
          <Checkbox>Bold</Checkbox>
        </Form.Item>
        <Form.Item initialValue={values?.bold} name='italic' valuePropName="checked">
          <Checkbox>Italic</Checkbox>
        </Form.Item>
        <Form.Item initialValue={values?.bold} name='underline' valuePropName="checked">
          <Checkbox>Underline</Checkbox>
        </Form.Item>
      </Flex>


      <DividerWithHeader title='Conditions' />
      <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
    </Form>
  )
}

export default TextFieldSettings;