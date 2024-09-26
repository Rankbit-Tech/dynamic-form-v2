
import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";
import { VARIANT } from "@constants/fieldTypes"
import useSettingsForm from "@hooks/useSettingsForm";
import { useFormStore } from "@store/useFormStore"
import { Checkbox, Form } from "antd"

const SummarySettings = () => {

    const options = useFormStore(state =>
        state.fields.filter(field => field.variant === VARIANT.FIELD || field.variant === VARIANT.IMAGE)
            .map((item) => (item?.name && { label: item.name, value: item.name })).filter(Boolean));

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    return (
        <Form layout="vertical" className="max-w-xs mx-auto" initialValues={values} onValuesChange={handleValuesChange}>

            <Form.Item label={'Select fields for summary'} name={['validations', 'fields']} valuePropName="checked">
                <Checkbox.Group options={options} defaultValue={values?.validations?.fields} />
            </Form.Item>

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    )

}

export default SummarySettings