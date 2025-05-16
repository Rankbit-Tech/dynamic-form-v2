import React from "react";
import { DatePicker, DatePickerProps, Form } from "antd";

interface CustomDatePickerProps extends DatePickerProps {
  label: string;
  name: string;
  validations: Record<string, any>;
  dateFormat?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  validations,
  dateFormat,
}) => {
  const { required } = validations || {};

  const rules = [{ required, message: `Please select ${label}` }];
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <DatePicker className="w-full" format={dateFormat} />
    </Form.Item>
  );
};

export default CustomDatePicker;
