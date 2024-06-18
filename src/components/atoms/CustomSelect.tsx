import React from 'react';
import { Select, SelectProps } from 'antd';

const { Option } = Select;

interface CustomSelectProps extends SelectProps<any> {
    label: string;
    options: { value: string; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options = [], ...selectProps }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-700">{label}</label>
            <Select {...selectProps}>
                {options.map(option => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default CustomSelect;
