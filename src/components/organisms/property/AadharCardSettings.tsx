import React from 'react';
import { Form, Select, Checkbox } from 'antd';
import DividerWithHeader from '@components/atoms/Divider';
import { useFormStore } from '@store/useFormStore';
import { VARIANT } from '@constants/fieldTypes';



const AadharCardSettings: React.FC = () => {

    const options = useFormStore(state => state.fields.filter(field => field.variant === VARIANT.FIELD).map((item) => ({ label: item.label, value: item.name }))
    )

    const labels = [
        "Aadhaar Number",
        "Name",
        "Long Name",
        "Last Name",
        "Middle Name",
        "Date of Birth",
        "Address",
        "Gender",
        "Age",
        "Father Name"
    ];

    return (
        <Form layout="vertical" className="max-w-xs mx-auto">

            {labels.map((label, index) => (
                <div key={index} className="flex items-center mb-2">
                    <div className="w-1/2">
                        <span>{label}</span>
                    </div>
                    <div className="w-1/2">
                        <Form.Item name={label.toLowerCase().replace(/ /g, '')} className="mb-0">
                            <Select
                                options={options}
                            />
                        </Form.Item>
                    </div>
                </div>
            ))}


            <DividerWithHeader title="Validations" />
            <Form.Item name={['validations', 'required']} valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

            <DividerWithHeader title='Conditions' />
        </Form>
    );
}

export default AadharCardSettings;
