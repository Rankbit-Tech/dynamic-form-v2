import React from 'react';
import { Input, Form, Checkbox, Row, Col, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DividerWithHeader from '@components/atoms/Divider';
import useSettingsForm from '@hooks/useSettingsForm';

const CheckboxFieldSettings: React.FC = () => {

    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>

            <DividerWithHeader title="Options" />
            <Form.List name="options">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={16} key={key} align="middle">
                                <Col span={10}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        label="Label"
                                        rules={[{ required: true, message: 'Missing option label' }]}
                                    >
                                        <Input placeholder="Label" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        label="Value"
                                        rules={[{ required: true, message: 'Missing option value' }]}
                                    >
                                        <Input placeholder="Value" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                        style={{ fontSize: '24px', color: 'red' }}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add({ label: '', value: '' })} icon={<PlusOutlined />}>
                                Add Option
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <DividerWithHeader title="Validations" />
            <Form.Item name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

        </Form>
    );
};

export default CheckboxFieldSettings;
