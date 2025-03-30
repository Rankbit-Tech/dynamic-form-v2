import React from "react";
import { Input, Form, Checkbox, Select, Row, Col, Button, Flex } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DividerWithHeader from "@components/atoms/Divider";
import useSettingsForm from "@hooks/useSettingsForm";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";

const ImageUploadFieldSettings: React.FC = () => {
  const { handleValuesChange, values, handleCondition } = useSettingsForm();

  return (
    <Form
      initialValues={values}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Label" name="label">
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <DividerWithHeader title="Upload Configuration" />

      <Form.Item label="API Endpoint" name={["config", "endpoint"]}>
        <Input placeholder="Enter API endpoint URL" />
      </Form.Item>
      <Form.Item label="Request Type" name={["config", "requestType"]}>
        <Select>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Response URL Key" name={["config", "urlKey"]}>
        <Input placeholder="Key for uploaded file URL in response" />
      </Form.Item>
      <Form.Item label="Response Status Key" name={["config", "statusKey"]}>
        <Input placeholder="Key for upload status in response" />
      </Form.Item>

      <DividerWithHeader title="Headers" />
      <Form.List name={["config", "headers"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={16} key={key} align="middle">
                <Col span={10}>
                  <Form.Item
                    {...restField}
                    name={[name, "key"]}
                    label="Key"
                    rules={[{ required: true, message: "Missing header key" }]}
                  >
                    <Input placeholder="Header key" />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    label="Value"
                    rules={[
                      { required: true, message: "Missing header value" },
                    ]}
                  >
                    <Input placeholder="Header value" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ fontSize: "24px", color: "red" }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ key: "", value: "" })}
                icon={<PlusOutlined />}
              >
                Add Header
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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
      <Form.Item
        label="Accepted File Types"
        name={["validations", "acceptedFiles"]}
      >
        <Input placeholder="e.g., .jpg, .png, .pdf" />
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
