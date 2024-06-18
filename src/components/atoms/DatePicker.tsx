import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';

interface CustomDatePickerProps extends DatePickerProps {
    label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, ...datePickerProps }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-700">{label}</label>
            <DatePicker {...datePickerProps} />
        </div>
    );
};

export default CustomDatePicker;
