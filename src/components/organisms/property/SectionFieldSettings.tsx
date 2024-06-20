import React from 'react';
import { Input, Form, Switch } from 'antd';

const SectionFieldSettings: React.FC = () => {
    return (
        <Form layout="vertical">


            <Form.Item label="Number of Columns">
                <Input type="number" min={1} max={12} />
            </Form.Item>
            <Form.Item label="Collapsible">
                <Switch />
            </Form.Item>
            <Form.Item label="Default Collapsed" dependencies={['Collapsible']}>
                {({ getFieldValue }) => getFieldValue('Collapsible') ? <Switch /> : null}
            </Form.Item>
            {/* Add more settings as needed */}
        </Form>
    );
};

export default SectionFieldSettings;
