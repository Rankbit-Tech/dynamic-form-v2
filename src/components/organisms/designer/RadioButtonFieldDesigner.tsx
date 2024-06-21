import { Radio, Space } from 'antd';
import React from 'react';

interface RadioButtonFieldDesigner {
    label: string
    direction: "horizontal" | "vertical" | undefined
    options: Array<{ label: string, value: string }>,
    name: string
}

const RadioButtonFieldDesigner: React.FC<RadioButtonFieldDesigner> = ({ direction, label, options, name }) => {
    return (
        <div className="p-2 py-4 border rounded bg-white shadow">
            <label className='m-1 font-semibold'>{label}</label>
            {options?.length > 0 && <Radio.Group name={name}>
                <Space direction={direction}>
                    {options.map(option => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>}
        </div>
    );
};

export default RadioButtonFieldDesigner;
