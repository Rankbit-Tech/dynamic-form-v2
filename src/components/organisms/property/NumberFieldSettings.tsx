import React from 'react';
import { Input, Form, InputNumber, Flex, Row, Col } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';

const NumberFieldSettings: React.FC = () => {

    const { handleValuesChange, values } = useSettingsForm();

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

            {/* Add more settings as needed */}
        </Form>
    );
};

export default NumberFieldSettings;
