import DividerWithHeader from '@components/atoms/Divider';
import QueryBuilderComponent from '@components/molecules/QueryBuilder';
import useSettingsForm from '@hooks/useSettingsForm';
import { Flex, Form, Input, InputNumber } from 'antd';

const ImageSettings = () => {
    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form initialValues={values} layout="vertical" onValuesChange={handleValuesChange}>
            <Form.Item label="Label" name="label">
                <Input />
            </Form.Item>
            <Form.Item label="Default Source" name="src">
                <Input />
            </Form.Item>

            <Flex justify='space-between'>
                <Form.Item label="Width" name="width">
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="height" name="height">
                    <InputNumber min={0} />
                </Form.Item>
            </Flex>
            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    )
}

export default ImageSettings