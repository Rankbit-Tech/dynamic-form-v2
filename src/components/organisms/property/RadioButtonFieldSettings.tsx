import React from 'react';
import { Form, Input, Button, Row, Col, Checkbox, Select, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';
import { RADIO_DIRECTION } from '@constants/inputFieldConstants';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';

const RadioButtonFieldSettings: React.FC = () => {

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>

            <DividerWithHeader title="Appearence" />

            <Form.Item name="direction">
                <Select
                    defaultValue={RADIO_DIRECTION.VERTICAL}
                    style={{ width: 120 }}
                    options={
                        [
                            { value: RADIO_DIRECTION.VERTICAL, label: "Vertical" },
                            { value: RADIO_DIRECTION.HORIZONTAL, label: "Horizontal" },
                        ]
                    }
                />
            </Form.Item>
            <Form.Item initialValue={'default'} name="optionType">
                <Radio.Group>
                    <Radio value='default'>Default</Radio>
                    <Radio value='button'>Button</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item initialValue={'solid'} name="buttonStyle">
                <Radio.Group>
                    <Radio value='solid'>Solid</Radio>
                    <Radio value='outline'>Outline</Radio>
                </Radio.Group>
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

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    );
};

export default RadioButtonFieldSettings;
