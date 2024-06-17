import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';

interface CheckBoxProps extends CheckboxProps {
    label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, ...checkboxProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox {...checkboxProps} />
            <label className="text-gray-700">{label}</label>
        </div>
    );
};

export default CheckBox;
