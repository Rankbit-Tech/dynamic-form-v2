import React from 'react';
import { Input, Form, InputNumber, Checkbox } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';
import DividerWithHeader from '@components/atoms/Divider';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';

const PasswordFieldSettings: React.FC = () => {
    const { handleValuesChange, values, handleCondition } = useSettingsForm();
    

    return (
        <Form
            layout="vertical"
            initialValues={values}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            
            <Form.Item label="Min Length" name={['validations', 'minLength']}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Max Length" name={['validations', 'maxLength']}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Pattern" name={['validations', 'pattern']}>
                <Checkbox.Group>
                    <Checkbox value="number">Number</Checkbox>
                    <Checkbox value="alphabet">Alphabet</Checkbox>
                    <Checkbox value="specialCharacter">Special Character</Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    );
};

export default PasswordFieldSettings;
