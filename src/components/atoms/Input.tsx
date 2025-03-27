import React from "react";
import { Form, Input } from "antd";
import useEvaluteValue from "@hooks/useEvaluteValue";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  validations: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    numeric?: boolean;
    regEx?: string;
    regExRemark?: string;
    customValue?: string;
  };
}

const InputField: React.FC<TextInputProps> = ({
  label,
  name,
  disabled,
  placeholder,
  validations,
}) => {
  const {
    required,
    maxLength,
    minLength,
    disabled: validationDisabled,
    numeric,
    regEx,
    regExRemark,
  } = validations || {};
  useEvaluteValue();

  const rules: any = [
    required && { required, message: `Please enter your ${label}` },
    minLength && {
      min: minLength,
      message: `Minimum length is ${minLength} characters`,
    },
    maxLength && {
      max: maxLength,
      message: `Maximum length is ${maxLength} characters`,
    },
    numeric && {
      validator: (_: any, value: any) => {
        if (value && !/^\d+$/.test(value)) {
          return Promise.reject(new Error("Enter numbers only"));
        }
        return Promise.resolve();
      },
    },
    regEx && {
      validator: (_: any, value: any) => {
        if (value && !new RegExp(regEx).test(value)) {
          return Promise.reject(new Error(regExRemark));
        }
        return Promise.resolve();
      },
    },
  ].filter(Boolean);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input
        placeholder={placeholder}
        disabled={disabled || validationDisabled}
      />
    </Form.Item>
  );
};

export default InputField;
