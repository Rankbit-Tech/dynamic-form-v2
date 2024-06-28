import { DatePicker } from 'antd';
import React from 'react';

const DateTimeFieldDesigner: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="p-2 border rounded bg-white shadow ">
            <label>{label}</label>
            <div className="mt-4">
                <DatePicker className='w-full' />
            </div>
        </div>
    );
};

export default DateTimeFieldDesigner;
