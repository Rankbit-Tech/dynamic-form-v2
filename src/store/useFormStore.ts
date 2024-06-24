import { transformData } from '@utils/transform';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];





interface FormState {

    fields: recordArray;
    isPreview: boolean
    selectedField: RecordType | null;
    setSelected: (data: RecordType | null) => void;
    setFields: (data: RecordType | null) => void;
    setIsPreview: (flag: boolean) => void

}


export const useFormStore = create<FormState>()(
    devtools(
        immer((set, get) => ({
            fields: [],
            isPreview: false,
            selectedField: null,
            setSelected: (data: RecordType | null) => {
                set((state: FormState) => {
                    state.selectedField = data
                })
            },
            setIsPreview: (flag: boolean) => {
                set((state: FormState) => {
                    state.isPreview = flag
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
