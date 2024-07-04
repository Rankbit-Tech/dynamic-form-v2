import React from 'react'
import { Form, Input, InputNumber } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import TextArea from 'antd/es/input/TextArea';

const TextFieldSettings: React.FC = () => {
  const { handleValuesChange, values } = useSettingsForm();

  return (
    <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
      <Form.Item label="Label" name="label">
        <Input />
      </Form.Item>

      <Form.Item label="Label" name="fontSize">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Paragraph" name="paragraph">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  )
}

export default TextFieldSettings;