export interface FormBuilderPageProps {
    onFormSave: (schema: Record<string, any>) => void
    isUpdateState?:boolean
}

export interface Field {
    label: string;
    value: string | any;
    type: string;
    name: string;
}

export interface Step {
    title: string;
    fields: Field[];
}

export interface SameAsAboveOption {
    label: string;
    value: string;
}
export interface FormValues {
    [key: string]: any;
}