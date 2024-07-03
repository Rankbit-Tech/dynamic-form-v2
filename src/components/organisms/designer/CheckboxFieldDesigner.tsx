import { Checkbox } from 'antd';
import React from 'react';

interface CheckboxFieldDesignerProps {
    label: string;
    options?: string[];
}

const CheckboxFieldDesigner: React.FC<CheckboxFieldDesignerProps> = ({ label, options }) => {

    return (
        <div className="p-2 py-4 border rounded bg-white shadow">
            <label>{label}</label>
            <div className="mt-1">
                <Checkbox.Group
                    options={options}
                />
            </div>
        </div>
    );
};

export default CheckboxFieldDesigner;
