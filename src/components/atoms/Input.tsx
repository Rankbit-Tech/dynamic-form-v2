import React from 'react';
import { Form, Input } from 'antd';

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean
  validations: {
    required: boolean
    minLength?: number
    maxLength?: number
    disabled?: boolean
  }
}

const InputField: React.FC<TextInputProps> = ({ label, name, disabled, placeholder, validations }) => {
  const { required, maxLength, minLength, disabled: validationDisabled } = validations || {}

  const rules = [
    { required, message: `Please enter your ${label}` },
    { min: minLength, message: `Minimum length is ${minLength} characters` },
    { max: maxLength, message: `Maximum length is ${maxLength} characters` },
  ].filter(rule => rule.required || rule.min !== undefined || rule.max !== undefined);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input placeholder={placeholder} disabled={disabled || validationDisabled} />
    </Form.Item>
  );
};

export default InputField;
