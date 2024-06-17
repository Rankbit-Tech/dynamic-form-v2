import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



type record = Record<string, any>;
type recordArray = Record<string, any>[];


interface FormState {
    sections: record;
    selectedField: record | null;
    setSection: (data: record) => void;
    setSelected: (data: record | null) => void
}

type updateFuncType = {
    updateFunc: (data: record) => record
}

export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            sections: [],
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
            }

        }))
    )
)
