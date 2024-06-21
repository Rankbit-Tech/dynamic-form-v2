import React from 'react';
import { Input, Form, Switch } from 'antd';
import { useFormStore } from '@store/useFormStore';

const StepperFieldSettings: React.FC = () => {

    const { selectedField, setFields } = useFormStore(state => state)

    if (!selectedField) return <h2>PLease select field to change settings</h2>

    const handleValuesChange = (changedValues: string[], allValues: string[]) => {
        setFields((fields: any) => {
            const elements = [...fields]
            const index = elements.findIndex((item: Record<string, any>) => item.id == selectedField.id)
            elements[index] = { ...elements[index], ...allValues }
            return elements
        })
    };
    return (
        <Form layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="Collapse" name="isCollapse">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default StepperFieldSettings;
