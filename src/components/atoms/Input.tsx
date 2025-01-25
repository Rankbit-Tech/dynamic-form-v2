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
    numeric?: boolean
    regEx?: string
  }
}

const InputField: React.FC<TextInputProps> = ({ label, name, disabled, placeholder, validations }) => {
  const { required, maxLength, minLength, disabled: validationDisabled, numeric, regEx } = validations || {}

  const rules: any = [
    required && { required, message: `Please enter your ${label}` },
    minLength && { min: minLength, message: `Minimum length is ${minLength} characters` },
    maxLength && { max: maxLength, message: `Maximum length is ${maxLength} characters` },
    numeric && {
      validator: (_: any, value: any) => {
        if (value && !/^\d+$/.test(value)) {
          return Promise.reject(new Error("Enter numbers only"));
        }
        return Promise.resolve();
      }
    },
    regEx && {
      validator: (_: any, value: any) => {
        if (value && !new RegExp(regEx).test(value)) {
          return Promise.reject(new Error(`The value does not match the required pattern: ${regEx}`));
        }
        return Promise.resolve();
      }
    }
  ].filter(Boolean);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input placeholder={placeholder} disabled={disabled || validationDisabled} />
    </Form.Item>
  );
};

export default InputField;
