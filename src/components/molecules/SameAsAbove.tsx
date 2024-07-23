import { Checkbox, Form } from 'antd';


interface SameAsAboveProps {

    label: string;
    value: string;
    onChange: (value: string) => void;
}

const SameAsAbove: React.FC<SameAsAboveProps> = () => {

    return (
        <Form.Item label="Same As Above" name="sameAsAbove" valuePropName='checked'>
            <Checkbox>
                Same As Above
            </Checkbox>
        </Form.Item>

    );
};

export default SameAsAbove;
