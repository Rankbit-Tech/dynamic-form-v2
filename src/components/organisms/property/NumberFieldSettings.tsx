import React from 'react';
import { Input, Form, InputNumber, Row, Col, Checkbox } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';


const NumberFieldSettings: React.FC = () => {

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form layout="vertical" initialValues={values} onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input />
            </Form.Item>

            <DividerWithHeader title='Validations' />

            <Form.Item initialValue={values?.validations.required} name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>
            <Form.Item initialValue={values?.validations.showControls} name="showControls" valuePropName="checked">
                <Checkbox checked={values?.validations.showControls}>Show Controls (Up and Down arrow)</Checkbox>
            </Form.Item>
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <Form.Item label="Default Value" name="defaultValue">
                        <InputNumber className='w-full' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Step" name="step">
                        <InputNumber className='w-full' />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <Form.Item label="Minimum Value" name={['validations', 'minValue']}>
                        <InputNumber className='w-full' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Maximum Value" name={['validations', 'maxValue']}>
                        <InputNumber className='w-full' />
                    </Form.Item>
                </Col>
            </Row>

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    );
};

export default NumberFieldSettings;
