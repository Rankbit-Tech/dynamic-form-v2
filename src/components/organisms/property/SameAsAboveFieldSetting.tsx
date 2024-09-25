import React from 'react';
import { Form, Select, Checkbox, Row, Col, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DividerWithHeader from '@components/atoms/Divider';
import useSettingsForm from '@hooks/useSettingsForm';
import { useFormStore } from '@store/useFormStore';
import { VARIANT } from '@constants/fieldTypes';


const CheckboxFieldSettings: React.FC = () => {
    const options = useFormStore(state => state.fields.filter(field => field.variant === VARIANT.FIELD).map((item) => ({ label: item.label, value: item.name })));

    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
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
                                        label="From"
                                        rules={[{ required: true, message: 'Missing option label' }]}
                                    >
                                        <Select
                                            options={options}
                                            placeholder="Select a label"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        label="To"
                                        rules={[{ required: true, message: 'Missing option value' }]}
                                    >
                                        <Select
                                            options={options}
                                            placeholder="Select a value"
                                        />
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
