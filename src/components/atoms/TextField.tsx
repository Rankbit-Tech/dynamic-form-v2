import React from 'react';
import { Form } from 'antd';

interface CustomTextFieldProps {
    label: string;
    fontSize: number
    paragraph: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, paragraph, fontSize }) => {

    return (<>
        <Form.Item label={label}>
            <p style={{ fontSize: `${fontSize}px` }}>{paragraph}</p>
        </Form.Item>
    </>
    );
};

export default CustomTextField;
