import { Select } from 'antd';
import React from 'react';


interface SelectFieldDesignerProps {
    label: string
    options: {
        label: string
        value: string | number
    }[]
    defaultValue: SelectFieldDesignerProps['options'][number]['value'];
}

const SelectFieldDesigner: React.FC<SelectFieldDesignerProps> = ({ label, options, defaultValue }) => {
    return (
        <div className="p-2 border rounded bg-white shadow">
            <label htmlFor="">{label}</label>
            <Select
                defaultValue={defaultValue}
                className='w-full mt-5'
                disabled
                options={options}
            />
        </div>
    );
};

export default SelectFieldDesigner;
