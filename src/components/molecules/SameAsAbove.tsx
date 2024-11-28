import useEventBus from '@hooks/useEventBus';
import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';


interface SameAsAboveProps {
    label: string;
    value: string;
    name: string;
    options: any;
    onChange: (value: string) => void;
    validations: Record<string, any>
}

const SameAsAbove: React.FC<SameAsAboveProps> = ({ label, validations, name, options }) => {

    const { emitEvent } = useEventBus()

    const { required, disable } = validations || {}

    const rules = [
        required && { required, message: `${label} is required` }
    ]

    const handleSaveAsAboveChange = (e: CheckboxChangeEvent) => {
        emitEvent('fillSaveAsAbove', { options, isChecked: e.target.checked })
    }


    return (
        <Form.Item name={name} valuePropName='checked' rules={rules}>
            <Checkbox disabled={disable} onChange={handleSaveAsAboveChange}>
                {label}
            </Checkbox>
        </Form.Item>

    );
};

export default SameAsAbove;
