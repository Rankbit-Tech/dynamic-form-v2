import React from "react";
import { Form, Select } from "antd";
import { SelectInputProps, useSelectOptions } from "@hooks/useSelectOptions";

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { label, name, defaultValue, validations } = props;
  const { options, loading } = useSelectOptions(props);

  const { required } = validations || {};
  const rules = [
    { required, message: `Please select ${label || "any value"}` },
  ].filter((rule) => rule.required);

  return (
    <Form.Item
      label={label}
      initialValue={defaultValue}
      name={name}
      rules={rules}
    >
      <Select loading={loading} options={options} />
    </Form.Item>
  );
};

export default SelectInput;
