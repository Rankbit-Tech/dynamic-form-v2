import React from 'react';
import { Form } from 'antd';

interface CustomTextFieldProps {
    label: string;
    fontSize: number
    paragraph: string
    textColor: string
    bold: boolean
    italic: boolean
    underline: boolean
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, paragraph, fontSize, textColor, bold, italic, underline }) => {

    const styles = {
        fontSize: `${fontSize}px`,
        color: textColor,
        ...(bold && { fontWeight: 'bold' }),
        ...(italic && { fontStyle: 'italic' }),
        ...(underline && { textDecoration: 'underline' }),

    }
    return (<>
        <Form.Item label={label}>
            <p style={styles}>{paragraph}</p>
        </Form.Item>
    </>
    );
};

export default CustomTextField;
