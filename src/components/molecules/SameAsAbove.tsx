import { Checkbox, Form } from 'antd';


interface SameAsAboveProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    validations: Record<string, any>
}

const SameAsAbove: React.FC<SameAsAboveProps> = ({ label, validations }) => {
    const { required, disable } = validations || {}

    const rules = [
        required && { required, message: `${label} is required` }
    ]
    return (
        <Form.Item name="sameAsAbove" valuePropName='checked' rules={rules}>
            <Checkbox disabled={disable} >
                {label}
            </Checkbox>
        </Form.Item>

    );
};

export default SameAsAbove;
