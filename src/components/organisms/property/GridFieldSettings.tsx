import React, { useState } from 'react';
import { InputNumber, Select, Form } from 'antd';

const { Option } = Select;

const GridFieldSettings: React.FC = () => {

    return (
        <Form layout="vertical">
            <Form.Item label="Columns">
                <InputNumber min={1} max={6} />
            </Form.Item>
            <Form.Item label="Placement">
                <Select defaultValue={"start"} >
                    <Option value="start">Start</Option>
                    <Option value="center">Center</Option>
                    <Option value="end">End</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default GridFieldSettings;
