import React from 'react';
import { Checkbox } from 'antd';

const { Group } = Checkbox;

interface CheckboxOption {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    label: string;
    options: CheckboxOption[];
    value?: string[];
    onChange?: (checkedValues: any[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options = [], value = [], onChange, ...checkboxProps }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-700">{label}</label>
            <Group options={options} value={value} onChange={onChange} {...checkboxProps} />
        </div>
    );
};

export default CheckboxGroup;
