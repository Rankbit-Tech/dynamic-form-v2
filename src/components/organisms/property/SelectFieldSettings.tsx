import React, { useState } from 'react';
import { Input, Form, Button, Row, Col, Select, Checkbox, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DividerWithHeader from '@components/atoms/Divider';
import useSettingsForm from '@hooks/useSettingsForm';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';
import { fetchAndProcessOptions } from '@api/aadhardata';

type OptionType = {
    label: string;
    value: string
}[];

const SelectFieldSettings: React.FC = () => {
    const { handleValuesChange, values, handleCondition } = useSettingsForm();
    const [apiChecked, setApiChecked] = useState(values.apiChecked || false);
    const [loading, setLoading] = useState(false);

    const options = [{ label: 'Select default value', value: '' }, ...(values.options as OptionType)];

    const handleAPICheckedCheckboxChange = (e: any) => {
        setApiChecked(e.target.checked);
        handleValuesChange({ apiChecked: e.target.checked }, { ...values, apiChecked: e.target.checked });
    };

    const fetchFromAPI = async () => {
        setLoading(true);
        try {
            const fetchedOptions = await fetchAndProcessOptions({
                apiUrl: values.apiUrl,
                labelPath: 'label',
                valuePath: 'value',
            });
            handleValuesChange({ options: fetchedOptions }, { ...values, options: fetchedOptions });
            message.success('Options fetched successfully!');
        } catch (error) {
            message.error('Failed to fetch options from API');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>

            <Form.Item name="apiChecked" valuePropName="checked">
                <Checkbox checked={apiChecked} onChange={handleAPICheckedCheckboxChange}>Fetch from API</Checkbox>
            </Form.Item>

            {!apiChecked ? (
                <>
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

                    <Form.Item name="defaultValue" label="Default Value">
                        <Select
                            defaultValue=""
                            placeholder="Select a default value"
                            options={options}
                        />
                    </Form.Item>
                </>
            ) : (
                <>
                    <Form.Item label="API URL" name="apiUrl">
                        <Input placeholder="Enter API URL" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={fetchFromAPI} loading={loading}>
                            Fetch Options from API
                        </Button>
                    </Form.Item>
                </>
            )}

            <DividerWithHeader title="Validations" />
            <Form.Item name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

            <DividerWithHeader title="Conditions" />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    );
};

export default SelectFieldSettings;
