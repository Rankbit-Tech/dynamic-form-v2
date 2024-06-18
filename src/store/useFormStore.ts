import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



type record = Record<string, any>;
type recordArray = Record<string, any>[];


interface FormState {
    sections: record;
    selectedField: record | null;
    steps: record,
    fields: record,
    setSection: (data: record) => void;
    setSteps: (data: record) => void;
    setFields: (data: record) => void;

    setSelected: (data: record | null) => void
}



export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            sections: [],
            steps: [],
            fields: [],
            selectedField: null,
            setSection: (callback: any) => {
                set((state: FormState) => {
                    state.sections = callback(get().sections);
                })
            },
            setSelected: (data: record | null) => {
                set((state: FormState) => {
                    state.selectedField = data
                })
            },
            setSteps: (callback: any) => {
                set((state: FormState) => {
                    state.steps = callback(get().steps)
                })
            },
            setFields: (callback: any) => {
                set((state: FormState) => {
                    state.fields = callback(get().fields)
                })
            }

        }))
    )
)
