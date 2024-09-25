import React from 'react';
import { Form, Select, Checkbox, Input, Row, Col, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import DividerWithHeader from '@components/atoms/Divider';
import { useFormStore } from '@store/useFormStore';
import { VARIANT } from '@constants/fieldTypes';
import useSettingsForm from '@hooks/useSettingsForm';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';


const AadharCardSettings: React.FC = () => {

    const options = useFormStore(state =>
        state.fields.filter(field => field.variant === VARIANT.FIELD || field.variant === VARIANT.IMAGE)
            .map((item) => (item.name && { label: item.name, value: item.name }))
    )

    const labels = [
        { key: "aadhaar_number", value: "Aadhaar Number" },
        { key: "first_name", value: "Fist Name" },
        { key: "aadhar_image", value: "Aadhar Image" },
        { key: "long_name", value: "Long Name" },
        { key: "last_name", value: "Last Name" },
        { key: "middle_name", value: "Middle Name" },
        { key: "dob", value: "Date of Birth" },
        { key: "address", value: "Address" },
        { key: "gender", value: "Gender" },
        { key: "age", value: "Age" },
        { key: "vtc", value: "Village" },
        { key: "city", value: "City" },
        { key: "po", value: "Taluka" },
        { key: "country", value: "Country" },
        { key: "dist", value: "District" },
        { key: "state", value: "State" },
        { key: "father_name", value: "Father's Name" },
        { key: "zip", value: "Pincode" },

    ];

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form layout="vertical" className="max-w-xs mx-auto" initialValues={values} onValuesChange={handleValuesChange}>

            {labels.map(({ key, value }: { key: string, value: string }, index) => (
                <div key={index} className="flex items-center mb-2">
                    <div className="w-1/2">
                        <span>{value}</span>
                    </div>
                    <div className="w-1/2">
                        <Form.Item name={["mapFields", key]} className="mb-0">
                            <Select
                                options={options}
                            />
                        </Form.Item>
                    </div>
                </div>
            ))}


            <DividerWithHeader title="Validations" />
            <Form.Item name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

            <DividerWithHeader title="API config" />
            <Form.Item name={['config', 'aadhar_verify']} label="Aadhar verify endpoint">
                <Input />
            </Form.Item>
            <Form.Item name={['config', 'otp_verify']} label="OTP verify endpoint">
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

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />


        </Form>
    );
}

export default AadharCardSettings;
