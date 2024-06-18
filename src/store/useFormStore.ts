import { transformData } from '@utils/transform';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];

export interface Field {
    id: string;
    type: string;
    label?: string;
    name?: string;
    placeholder?: string;
    validations?: string[];
    parentId?: string
    children?: (Field | Step | Section)[];

}

export interface Step {
    id: string;
    type: string;
    isCollapse: boolean;
    parentId?: string;
    children?: (Field | Step | Section)[];
}

export interface Section {
    id: string;
    type: string;
    cols: number;
    isCollapsable: boolean;
    parentId?: string;
    children?: (Field | Step | Section)[];
}

interface FormState {
    sections: Section[];
    steps: Step[];
    fields: Field[];
    transformedData: (Field | Step | Section)[];
    selectedField: Field | null;
    setSection: (callback: (sections: Section[]) => Section[]) => void;
    setSteps: (callback: (steps: Step[]) => Step[]) => void;
    setFields: (callback: (fields: Field[]) => Field[]) => void;
    setSelected: (data: Field | null) => void;
    transformData: () => void;
}


export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            sections: [],
            steps: [],
            fields: [],
            transformedData: [],
            selectedField: null,
            setSection: (callback: any) => {
                set((state: FormState) => {
                    state.sections = callback(get().sections);
                    get().transformData();
                })
            },
            setSelected: (data: Field | null) => {
                set((state: FormState) => {
                    state.selectedField = data

                })
            },
            setSteps: (callback: any) => {
                set((state: FormState) => {
                    state.steps = callback(get().steps);
                    get().transformData();
                })
            },
            setFields: (callback: any) => {
                set((state: FormState) => {
                    state.fields = callback(get().fields);
                    get().transformData();
                })
            },
            transformData: () => {
                set((state) => {

                    state.transformedData = transformData(get().steps, get().sections, get().fields);
                });
            }

        }))
    )
)
