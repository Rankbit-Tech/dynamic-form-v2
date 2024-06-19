import { transformData } from '@utils/transform';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];





interface FormState {

    fields: recordArray;
    selectedField: RecordType | null;
    setSelected: (data: RecordType | null) => void;
    setFields: (data: RecordType | null) => void;

}


export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            fields: [],
            selectedField: null,
            setSelected: (data: RecordType | null) => {
                set((state: FormState) => {
                    state.selectedField = data
                })
            },
            setFields: (callback: any) => {
                set((state: FormState) => {
                    state.fields = callback(get().fields);
                })
            },


        }))
    )
)
