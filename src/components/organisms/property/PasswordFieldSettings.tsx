import React, { useEffect, useState } from 'react';
import { Input, Form, InputNumber, Checkbox } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const PasswordFieldSettings: React.FC = () => {
    const { handleValuesChange, values, setValues } = useSettingsForm();
    const [validationPattern, setValidationPattern] = useState('');

    const updateValidationRules = (pattern) => {
        let Pattern = '';
        if (pattern.includes('number')) {
            Pattern += '(?=.*[0-9])';
        }
        if (pattern.includes('alphabet')) {
            Pattern += '(?=.*[a-zA-Z])';
        }
        if (pattern.includes('specialCharacter')) {
            Pattern += '(?=.*[!@#$%^&*])';
        }
        setValidationPattern(Pattern);
    };

    useEffect(() => {
        if (values.pattern) {
            updateValidationRules(values.pattern);
        }
    }, [values.pattern]);

    if (!values) {
        return null;
    }

    return (
        <Form
            layout="vertical"
            initialValues={values}
            onValuesChange={(changedValues, allValues) => {
                handleValuesChange(changedValues, allValues);
                if (changedValues.pattern) {
                    updateValidationRules(changedValues.pattern);
                }
            }}
        >
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item
                label="Default Value"
                name="defaultValue"
                rules={[
                    {
                        pattern: new RegExp(validationPattern),
                        message: 'Password does not meet the required criteria',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item label="Min Length" name="minLength">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Max Length" name="maxLength">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Pattern" name="pattern">
                <Checkbox.Group>
                    <Checkbox value="number">Number</Checkbox>
                    <Checkbox value="alphabet">Alphabet</Checkbox>
                    <Checkbox value="specialCharacter">Special Character</Checkbox>
                </Checkbox.Group>
            </Form.Item>
        </Form>
    );
};

export default PasswordFieldSettings;
