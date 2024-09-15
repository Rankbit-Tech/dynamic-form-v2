import { useFormStore } from "@store/useFormStore";

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
  handleValuesChange: (
    changedValues: Record<string, any>,
    allValues: Record<string, any>,
  ) => void;
  values: FieldType;
  handleCondition: (values: Record<string, any>) => void;
};

const useSettingsForm = (): UseSettingsFormReturnType => {
  const { selectedField, setFields, fields } = useFormStore((state) => state);

  const values = fields.find(
    (item) => item.id == selectedField?.id,
  ) as FieldType;

  if (values && values?.options === null) {
    values.options = [];
  }

  const handleValuesChange = (
    changedValues: Record<string, any>,
    allValues: Record<string, any>,
  ) => {
    setFields((fields: FieldType[]) => {
      const elements = [...fields];
      const index = elements.findIndex(
        (item: FieldType) => item.id === selectedField?.id,
      );

      if (index !== -1) {
        elements[index] = {
          ...elements[index],
          ...changedValues,
          validations: {
            ...elements[index].validations,
            ...changedValues.validations,
          },
          options: allValues?.options ? allValues.options : values.options,
          headers: allValues?.headers ? allValues.headers : values.headers,
          queryParams: allValues?.queryParams
            ? allValues.queryParams
            : values.queryParams,
          requestBody: allValues?.requestBody
            ? allValues.requestBody
            : values.requestBody,
          conditions: {
            ...elements[index].conditions,
            ...changedValues.conditions,
          },
          mapFields: {
            ...elements[index].mapFields,
            ...changedValues.mapFields,
          },
        };
      }

      return elements;
    });
  };
  const handleCondition = (values: Record<string, any>) => {
    handleValuesChange(
      { conditions: JSON.parse(values.conditions) },
      { ...values, conditions: values },
    );
  };

  return { handleValuesChange, values, handleCondition };
};

export default useSettingsForm;
