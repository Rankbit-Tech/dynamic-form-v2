import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';

interface PasswordInputProps {
    label: string;
    name: string;
    validations?: {
        requireAlphabet?: boolean;
        requireNumber?: boolean;
        requireSpecialCharacter?: boolean;
    };
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, validations }) => {
    const [validationPattern, setValidationPattern] = useState('');

    useEffect(() => {
        let pattern = '';
        if (validations?.requireAlphabet) {
            pattern += '(?=.*[a-zA-Z])';
        }
        if (validations?.requireNumber) {
            pattern += '(?=.*[0-9])';
        }
        if (validations?.requireSpecialCharacter) {
            pattern += '(?=.*[!@#$%^&*])';
        }
        setValidationPattern(pattern);
    }, [validations]);

    const rules = [
        {
            pattern: new RegExp(validationPattern),
            message: `Password must include ${validations?.requireAlphabet ? 'an alphabet, ' : ''
                }${validations?.requireNumber ? 'a number, ' : ''}${validations?.requireSpecialCharacter ? 'a special character, ' : ''
                }`.slice(0, -2),
        },
    ];

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.Password />
        </Form.Item>
    );
};

export default PasswordInput;
