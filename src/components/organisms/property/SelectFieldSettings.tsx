import React from "react";
import { Input, Form, Button, Row, Col, Select, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DividerWithHeader from "@components/atoms/Divider";
import useSettingsForm from "@hooks/useSettingsForm";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";

type OptionType = {
  label: string;
  value: string;
}[];

const SelectFieldSettings: React.FC = () => {
  const { handleValuesChange, values, handleCondition } = useSettingsForm();

  const options = [
    { label: "Select default value", value: "" },
    ...(values.options as OptionType),
  ];

  const { optionSource } = values;

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

      <DividerWithHeader title="Options" />
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
      {optionSource === "api" ? (
        <>
          <Form.Item label="API Endpoint" name="endpoint">
            <Input />
          </Form.Item>
          <Form.Item label="Request Type" name="requestType">
            <Select>
              <Select.Option value="GET">GET</Select.Option>
              <Select.Option value="POST">POST</Select.Option>
              <Select.Option value="PUT">PUT</Select.Option>
              <Select.Option value="DELETE">DELETE</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Label Key" name="labelKey">
            <Input />
          </Form.Item>
          <Form.Item label="Value Key" name="valueKey">
            <Input />
          </Form.Item>
          <Form.Item label="Data Path" name="dataPath">
            <Input />
          </Form.Item>
          <h3>Headers</h3>
          <Form.List name="headers">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key} align="middle">
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        label="Key"
                        rules={[
                          { required: true, message: "Missing header key" },
                        ]}
                      >
                        <Input placeholder="Key" />
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
                        <Input placeholder="Value" />
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
          <h3>Query Parameters</h3>
          <Form.List name="queryParams">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key} align="middle">
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        label="Key"
                        rules={[
                          { required: true, message: "Missing query key" },
                        ]}
                      >
                        <Input placeholder="Key" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        label="Value"
                        rules={[
                          { required: true, message: "Missing query value" },
                        ]}
                      >
                        <Input placeholder="Value" />
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
                    Add Query Parameter
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <h3>Request Body</h3>
          <Form.List name="requestBody">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key} align="middle">
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        label="Key"
                        rules={[
                          { required: true, message: "Missing body key" },
                        ]}
                      >
                        <Input placeholder="Key" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        label="Value"
                        rules={[
                          { required: true, message: "Missing body value" },
                        ]}
                      >
                        <Input placeholder="Value" />
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
                    Add Request Body
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      ) : (
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
                      rules={[
                        { required: true, message: "Missing option label" },
                      ]}
                    >
                      <Input placeholder="Label" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      label="Value"
                      rules={[
                        { required: true, message: "Missing option value" },
                      ]}
                    >
                      <Input placeholder="Value" />
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
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}

      <Form.Item name="defaultValue" label="Default Value">
        <Select
          defaultValue=""
          placeholder="Select a default value"
          options={options}
        />
      </Form.Item>

      <DividerWithHeader title="Validations" />
      <Form.Item name={["validations", "required"]} valuePropName="checked">
        <Checkbox>Required</Checkbox>
      </Form.Item>

      <DividerWithHeader title="Conditions" />
      <QueryBuilderComponent
        handleCondition={handleCondition}
        conditions={values.conditions}
      />
    </Form>
  );
};

export default SelectFieldSettings;
