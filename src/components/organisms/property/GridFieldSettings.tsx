
import { InputNumber, Select, Form } from 'antd';
import useSettingsForm from '@hooks/useSettingsForm';

const { Option } = Select;

const GridFieldSettings: React.FC = () => {
    const { handleValuesChange, values } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Columns" name="cols">
                <InputNumber min={1} max={6} />
            </Form.Item>
            <Form.Item label="Placement" name="placement">
                <Select defaultValue={"start"} >
                    <Option value="start">Start</Option>
                    <Option value="center">Center</Option>
                    <Option value="end">End</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default GridFieldSettings;
