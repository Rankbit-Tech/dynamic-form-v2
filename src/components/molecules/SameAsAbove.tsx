import React, { useState, useEffect } from 'react';
import { Checkbox, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface SameAsAboveProps {

    label: string;
    value: string;
    onChange: (value: string) => void;
}

const SameAsAbove: React.FC<SameAsAboveProps> = ({ label }) => {

    return (
        <Form.Item label="Same As Above" name="sameAsAbove" valuePropName='checked'>
            <Checkbox>
                Same As Above
            </Checkbox>
        </Form.Item>

    );
};

export default SameAsAbove;
