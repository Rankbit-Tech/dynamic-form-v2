import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";
import useSettingsForm from "@hooks/useSettingsForm";
import { Form, Input } from "antd";

const DividerSettings = () => {
  const { handleValuesChange, handleCondition, values } = useSettingsForm();

  return (
    <Form
      layout="vertical"
      initialValues={values}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Title" name="title">
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item label="Name" name="name">
        <Input placeholder="Enter name" />
      </Form.Item>

      <DividerWithHeader title="Conditions" />

      <QueryBuilderComponent
        handleCondition={handleCondition}
        conditions={values.conditions}
      />
    </Form>
  );
};

export default DividerSettings;
