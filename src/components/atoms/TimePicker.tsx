import React from 'react';
import { TimePicker, TimePickerProps } from 'antd';

interface CustomTimePickerProps extends TimePickerProps {
    label: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ label, ...timePickerProps }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}</label>
            <TimePicker {...timePickerProps} />
        </div>
    );
};

export default CustomTimePicker;
