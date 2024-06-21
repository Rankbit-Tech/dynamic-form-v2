import { useFormStore } from '@store/useFormStore';
import { ReactElement } from 'react';

// Define the structure of a field
interface FieldType {
    id: string;
    [key: string]: any;
}


type UseSettingsFormReturnType = ReactElement | { handleValuesChange: (changedValues: Record<string, any>) => void, values: Record<string, any> };


const useSettingsForm = (): UseSettingsFormReturnType => {
    const { selectedField, setFields, fields } = useFormStore(state => state);

    if (!selectedField) return <h2>Please select a field to change settings</h2>;
    const values = fields.find(item => item.id == selectedField.id) as FieldType
    const handleValuesChange = (changedValues: Record<string, any>) => {
        setFields((fields: FieldType[]) => {
            const elements = [...fields];
            const index = elements.findIndex((item: FieldType) => item.id === selectedField.id);
            if (index !== -1) {
                elements[index] = {
                    ...elements[index],
                    ...changedValues,
                    validations: {
                        ...elements[index].validations,
                        ...changedValues.validations
                    },
                    conditions: {
                        ...elements[index].conditions,
                        ...changedValues.conditions
                    }
                };
            }
            return elements;
        });
    };

    return { handleValuesChange, values };
};

export default useSettingsForm;

export function isHandleValuesChangeObject(
    value: UseSettingsFormReturnType
): value is { handleValuesChange: (changedValues: Record<string, any>) => void; values: FieldType } {
    return (value as { handleValuesChange: (changedValues: Record<string, any>) => void; values: FieldType }).handleValuesChange !== undefined;
}