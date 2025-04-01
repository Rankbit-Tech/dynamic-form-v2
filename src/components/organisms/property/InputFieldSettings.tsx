import React from "react";
import {
  Input,
  Form,
  Checkbox,
  InputNumber,
  Flex,
  Row,
  Col,
  Button,
} from "antd";
import useSettingsForm from "@hooks/useSettingsForm";
import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";
import TextArea from "antd/lib/input/TextArea";
import { getFormValues } from "@utils/index";

const InputFieldSettings: React.FC = () => {
  const { handleValuesChange, values, handleCondition } = useSettingsForm();

  const handleCode = () => {
    const value = values?.code;

    console.log(value);
    const res = eval(value);
    console.log(res);
  };

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
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
      {/* Validation settings */}
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
          initialValue={values?.validations.disabled}
          name={["validations", "disabled"]}
          valuePropName="checked"
        >
          <Checkbox>Disable</Checkbox>
        </Form.Item>
        <Form.Item
          initialValue={values?.validations.numeric}
          name={["validations", "numeric"]}
          valuePropName="checked"
        >
          <Checkbox>Numeric Only</Checkbox>
        </Form.Item>
      </Flex>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Min Length" name={["validations", "minLength"]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Max Length" name={["validations", "maxLength"]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="RegEx" name={["validations", "regEx"]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="RegEx Remark" name={["validations", "regExRemark"]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Custom Value" name={["validations", "customValue"]}>
        <Input placeholder="e.g. {{firstName} {{lastName}}" />
      </Form.Item>

      <Form.Item name="code">
        <TextArea></TextArea>
      </Form.Item>

      <Button onClick={handleCode}>Execute</Button>

      <DividerWithHeader title="Conditions" />
      <QueryBuilderComponent
        handleCondition={handleCondition}
        conditions={values.conditions}
      />
    </Form>
  );
};

export default InputFieldSettings;
