
import DividerWithHeader from "@components/atoms/Divider";
import QueryBuilderComponent from "@components/molecules/QueryBuilder";
import { VARIANT } from "@constants/fieldTypes"
import useSettingsForm from "@hooks/useSettingsForm";
import { useFormStore } from "@store/useFormStore"
import { Checkbox, Form } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";

const SummarySettings = () => {

    const [form] = useForm()

    const options = useFormStore(state =>
        state.fields.filter(field => field.variant === VARIANT.FIELD || field.variant === VARIANT.IMAGE)
            .map((item) => (item?.name && { label: item.name, value: item.name })).filter(Boolean));

    const { handleValuesChange, values, handleCondition } = useSettingsForm();

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        const { checked } = e.target || {}

        if (checked) {
            const initialValues = options.map(option => option.value);

            handleValuesChange({ validations: { fields: initialValues }, check_all: true }, values)
            form.setFieldsValue({
                validations: {
                    fields: initialValues,
                },
                check_all: true
            });
        } else {
            handleValuesChange({ validations: { fields: [] }, check_all: false }, values)

            form.setFieldsValue({
                validations: {
                    fields: [],
                },
                check_all: false
            });
        }
    }

    const handleValuesChangeWithCheckAll = (_changedValues: any, allValues: any) => {
        handleValuesChange(_changedValues, allValues);
        const selectedFields = allValues.validations?.fields || [];
        const allSelected = options.every((option) => selectedFields.includes(option.value));
        form.setFieldsValue({
            check_all: allSelected,
        });
    };

    return (
        <Form form={form} layout="vertical" className="max-w-xs mx-auto" initialValues={values} onValuesChange={handleValuesChangeWithCheckAll}>
            <Form.Item name="check_all" valuePropName="checked">
                <Checkbox onChange={handleSelectAll} >
                    Select All
                </Checkbox>
            </Form.Item>
            <Form.Item label={'Select fields for summary'} name={['validations', 'fields']}>
                <Checkbox.Group options={options} defaultValue={values?.validations?.fields} />
            </Form.Item>

            <DividerWithHeader title='Conditions' />
            <QueryBuilderComponent handleCondition={handleCondition} conditions={values.conditions} />
        </Form>
    )
}

export default SummarySettings