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
    title?: string;
    fields: Field[];
    name: string;
    type: string
    label: string
    value: any
}