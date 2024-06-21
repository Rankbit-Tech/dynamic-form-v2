import { useFormStore } from '@store/useFormStore';
import { ReactElement } from 'react';

// Define the structure of a field
interface FieldType {
    id: string;
    label: string;
    name: string;
    options?: Array<{ label: string; value: string }> | null;
    validations: Record<string, any>;
    conditions: Record<string, any>;
    parentId: string;
    [key: string]: any;
}


type UseSettingsFormReturnType = {
    handleValuesChange: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
    values: FieldType;
};

const useSettingsForm = (): UseSettingsFormReturnType => {
    const { selectedField, setFields, fields } = useFormStore(state => state);
    // if (!selectedField) return null
    const values = fields.find(item => item.id == selectedField?.id) as FieldType

    if (values && values?.options === null) {
        values.options = [];
    }
    const handleValuesChange = (changedValues: Record<string, any>, allValues: Record<string, any>) => {
        setFields((fields: FieldType[]) => {
            const elements = [...fields];
            const index = elements.findIndex((item: FieldType) => item.id === selectedField?.id);

            if (index !== -1) {
                elements[index] = {
                    ...elements[index],
                    ...changedValues,
                    validations: {
                        ...elements[index].validations,
                        ...changedValues.validations,
                    },
                    options: allValues.options || [],
                    conditions: {
                        ...elements[index].conditions,
                        ...changedValues.conditions,
                    },
                };
            }

            return elements;
        });
    };

    return { handleValuesChange, values };
};

export default useSettingsForm;