import React from "react";
import { Input, Form, Checkbox, Flex } from "antd";
import useSettingsForm from "@hooks/useSettingsForm";
import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";

const ImageUploadFieldSettings: React.FC = () => {
  const { handleValuesChange, values, handleCondition } = useSettingsForm();
  return (
    <Form
      layout="vertical"
      initialValues={values}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Label" name="label">
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <DividerWithHeader title="Validations" />

      <Flex justify="space-between">
        <Form.Item
          initialValue={values?.validations.required}
          name={["validations", "required"]}
          valuePropName="checked"
        >
          <Checkbox>Required</Checkbox>
        </Form.Item>

        <Form.Item
          initialValue={values?.validations.multiple}
          name={["validations", "multiple"]}
          valuePropName="checked"
        >
          <Checkbox>Multiple files</Checkbox>
        </Form.Item>
      </Flex>

      <Form.Item
        label="Accepted File Types"
        name={["validations", "acceptedFiles"]}
      >
        <Input placeholder="e.g., .jpg, .png, .pdf" />
      </Form.Item>
      <Form.Item label="Max File Size (MB)" name={["validations", "maxSize"]}>
        <Input type="number" placeholder="e.g., 5" />
      </Form.Item>
      <Form.Item label="Maximum Files" name={["validations", "maxCount"]}>
        <Input
          type="number"
          placeholder="e.g., 5"
          disabled={!values?.validations.multiple}
        />
      </Form.Item>
      <DividerWithHeader title="Conditions" />
      <QueryBuilderComponent
        handleCondition={handleCondition}
        conditions={values.conditions}
      />
    </Form>
  );
};

export default ImageUploadFieldSettings;
