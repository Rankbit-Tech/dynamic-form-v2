import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Select,
  InputNumber,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useSettingsForm from "@hooks/useSettingsForm";
import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";

const UploadDocumentsSettings: React.FC = () => {
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

      <DividerWithHeader title="Document Types" />
      <Form.Item
        label="Option Source"
        name="optionSource"
        initialValue="manual"
      >
        <Select>
          <Select.Option value="manual">Manual</Select.Option>
          <Select.Option value="api">API</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.optionSource !== currentValues.optionSource
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("optionSource") === "manual" ? (
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "label"]}
                          label="Label"
                          rules={[{ required: true, message: "Missing label" }]}
                        >
                          <Input placeholder="e.g., Aadhar Card" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          label="Value"
                          rules={[{ required: true, message: "Missing value" }]}
                        >
                          <Input placeholder="e.g., aadhar" />
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
                      onClick={() => add({ label: "", value: "" })}
                      icon={<PlusOutlined />}
                    >
                      Add Document Type
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          ) : (
            <>
              <Form.Item label="API Endpoint" name={"endpoint"}>
                <Input placeholder="Enter API endpoint URL" />
              </Form.Item>
              <Form.Item label="Request Type" name={"requestType"}>
                <Select>
                  <Select.Option value="GET">GET</Select.Option>
                  <Select.Option value="POST">POST</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Label Key" name={"labelKey"}>
                <Input placeholder="Key for label in response" />
              </Form.Item>
              <Form.Item label="Value Key" name={"valueKey"}>
                <Input placeholder="Key for value in response" />
              </Form.Item>
              <Form.Item label="Response Data Key" name={"dataPath"}>
                <Input placeholder="Key for data array in response" />
              </Form.Item>
            </>
          )
        }
      </Form.Item>
      <DividerWithHeader title="Delete Config" />

      <Form.Item label="Delete API endpoint" name="deleteEndpoint">
        <Input />
      </Form.Item>
      <Form.Item label="Delete Key" name="deleteKey">
        <Input />
      </Form.Item>
      <DividerWithHeader title="API Configuration" />
      <Form.Item label="API Endpoint" name={["config", "endpoint"]}>
        <Input placeholder="Enter API endpoint URL" />
      </Form.Item>
      <Form.Item label="Request Type" name={["config", "requestType"]}>
        <Select>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
        </Select>
      </Form.Item>

      <DividerWithHeader title="Headers" />
      <Form.List name={"headers"}>
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
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item name={["validations", "required"]} valuePropName="checked">
          <Checkbox>Required</Checkbox>
        </Form.Item>
        <Form.Item name={["validations", "multiple"]} valuePropName="checked">
          <Checkbox>Allow Multiple Documents</Checkbox>
        </Form.Item>
        <Form.Item label="Max File Size (MB)" name={["validations", "maxSize"]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Max File Count" name={["validations", "maxCount"]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Accepted File Types" name={["validations", "accept"]}>
          <Input placeholder="e.g., .pdf,.jpg,.png" />
        </Form.Item>
      </Space>

      <DividerWithHeader title="Conditions" />
      <QueryBuilderComponent
        handleCondition={handleCondition}
        conditions={values.conditions}
      />
    </Form>
  );
};

export default UploadDocumentsSettings;
