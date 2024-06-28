import React from 'react';
import { Input, Form } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const { TextArea } = Input;

const TextAreaFieldSettings: React.FC = () => {
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
            <Form.Item label="Default Value" name="defaultValue">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Rows" name="rows">
                <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Cols" name="cols">
                <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Max Length" name="maxLength">
                <Input type="number" min={1} />
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default TextAreaFieldSettings;
