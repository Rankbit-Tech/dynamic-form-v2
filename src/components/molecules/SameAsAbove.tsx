import React, { useState, useEffect } from 'react';
import { Checkbox, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface SameAsAboveProps {

    label: string;
    value: string;
    onChange: (value: string) => void;
}

const SameAsAbove: React.FC<SameAsAboveProps> = ({ label, onChange }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            onChange(label);
        }
    }, [checked, label, onChange]);

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
        if (!e.target.checked) {
            onChange('');
        }
    };

    return (
        <div className="same-as-above-molecule relative border rounded bg-white shadow mt-1">
            <Form.Item label="Same As Above">
                <Checkbox checked={checked} onChange={handleCheckboxChange}>
                    Same As Above
                </Checkbox>
            </Form.Item>

        </div>
    );
};

export default SameAsAbove;
