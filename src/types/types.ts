interface FormBuilderPageProps {
    onFormSave: (schema: Record<string, any>) => void
}

interface Field {
    label: string;
    value: string;
    type: string
    name: string
}

interface Step {
    title: string;
    fields: Field[];
}

interface SameAsAboveOption {
    label: string;
    value: string;
}
interface FormValues {
    [key: string]: any;
}