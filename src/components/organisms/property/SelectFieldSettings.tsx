import React from 'react';
import { Input, Form, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DividerWithHeader from '@components/atoms/Divider';
import useSettingsForm from '@hooks/useSettingsForm';

const SelectFieldSettings: React.FC = () => {
    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            {/* Add more settings specific to select fields */}

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
                            <Button type="dashed" onClick={() => add({ label: '', value:`` })} icon={<PlusOutlined />}>
                                Add Option
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};

export default SelectFieldSettings;
