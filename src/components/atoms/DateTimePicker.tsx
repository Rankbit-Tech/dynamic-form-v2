import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';

interface DateTimePickerProps extends DatePickerProps {
    label: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, ...datePickerProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}</label>
            <DatePicker showTime {...datePickerProps} />
        </div>
    );
};

export default DateTimePicker;
