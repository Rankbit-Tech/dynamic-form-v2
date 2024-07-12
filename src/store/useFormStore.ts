import { VARIANT } from '@constants/fieldTypes';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];


const test = [
    {
        id: 'jgWVOhKqxZI67LpaMEU_L',
        type: 'STEPPER',
        variant: 'STEPPER',
        title: 'Step'
    },
    {
        id: 'Yic9YeWZGDR7o-roaOW-u',
        type: 'INPUT',
        variant: 'FIELD',
        label: 'Username - 1',
        name: 'username1',
        placeholder: 'Placeholder',
        validations: {},
        conditions: {
            combinator: 'and',
            rules: []
        },
        parentId: 'jgWVOhKqxZI67LpaMEU_L'
    },
    {
        id: 'U5z-lQeMVeFOrlgdbk4YF',
        type: 'SECTION',
        variant: 'SECTION',
        title: 'section 1',
        isCollapsable: true,
        conditions: {
            combinator: 'and',
            rules: []
        },
        parentId: 'jgWVOhKqxZI67LpaMEU_L'
    },
    {
        id: 'lEvaweJhx7qNKSIijxjgK',
        type: 'AADHAR',
        variant: 'FIELD',
        label: 'Label',
        validations: {},
        conditions: {
            combinator: 'and',
            rules: []
        },
        parentId: 'jgWVOhKqxZI67LpaMEU_L',
        mapFields: {
            aadhaar_number: 'username1'
        }
    },
    {
        id: 'uLak9uqM--af3q1vckNJ2',
        type: 'SAMEASABOVE',
        variant: 'FIELD',
        label: 'Same As Above',
        validations: {},
        conditions: {
            combinator: 'and',
            rules: []
        },
        parentId: 'U5z-lQeMVeFOrlgdbk4YF',
        options: [
            {
                label: 'username1',
                value: 'username2'
            }
        ]
    },
    {
        id: '6xvxpg-4LAevx-qSDAmg9',
        type: 'INPUT',
        variant: 'FIELD',
        label: 'Username - 2',
        name: 'username2',
        placeholder: 'Placeholder',
        validations: {},
        conditions: {
            combinator: 'and',
            rules: []
        },
        parentId: 'U5z-lQeMVeFOrlgdbk4YF'
    }
]

interface Field {
    label: string;
    value: string;
}

interface Step {
    title: string;
    fields: Field[];
}
interface FormState {

    fields: recordArray;
    isPreview: boolean
    selectedField: RecordType | null;
    formValues: RecordType
    setSelected: (data: RecordType | null) => void;
    setFields: (data: RecordType | null) => void;
    setIsPreview: (flag: boolean) => void
    setFormValues: (data: RecordType | null) => void;
    getSummary: () => Step[]
}


export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            fields: [],
            isPreview: false,
            selectedField: null,
            formValues: {},
            setSelected: (data: RecordType | null) => {
                set((state: FormState) => {
                    state.selectedField = data
                })
            },
            setIsPreview: (flag: boolean) => {
                set((state: FormState) => {
                    state.isPreview = flag
                    state.formValues = {}
                })
            },
            setFields: (callback: any) => {
                set((state: FormState) => {
                    state.fields = callback(get().fields);
                })
            },
            setFormValues: (data: any) => {
                set((state: FormState) => {
                    state.formValues = data
                })
            },
            getSummary: () => {
                const { fields, formValues } = get();

                const groupedFields = fields.reduce((acc, field) => {
                    if (field.variant === 'FIELD') {
                        const step = fields.find(stepField => stepField.id === field.parentId && stepField.variant === 'STEPPER');
                        if (step) {
                            if (!acc[step.id]) {
                                acc[step.id] = {
                                    title: step.title,
                                    fields: []
                                };
                            }
                            acc[step.id].fields.push({
                                label: field.label,
                                value: formValues[field.name] || 'No value'
                            });
                        }
                    }
                    return acc;
                }, {});

                return Object.values(groupedFields);


            }


        }))
    )
)
