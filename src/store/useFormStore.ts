import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


interface InputField {
    id: string;
    type: string;
    label: string;
    name: string;
    placeholder?: string;
    validations?: string[];
}

interface FormSection {
    id: string;
    title: string;
    fields: InputField[];
}

interface FormState {
    sections: FormSection[];
    selectedField: InputField | null;
    addSection: (title: string) => void;
    addField: (sectionId: string, field: InputField) => void;
    selectField: (field: InputField) => void;
    updateField: (sectionId: string, field: InputField) => void;
}

export const useFormStore = create<FormState>()(
    devtools(
        immer((set) => ({
            sections: [],
            selectedField: null,
            addSection: (title) =>
                set((state) => {
                    state.sections.push({ id: Date.now().toString(), title, fields: [] });
                }),
            addField: (sectionId, field) =>
                set((state) => {
                    const section = state.sections.find((section: any) => section.id === sectionId);
                    if (section) {
                        section.fields.push(field);
                    }
                }),
            selectField: (field) => set((state) => {
                state.selectedField = field;
            }),
            updateField: (sectionId, updatedField) =>
                set((state) => {
                    const section = state.sections.find((section: any) => section.id === sectionId);
                    if (section) {
                        const fieldIndex = section.fields.findIndex((field: any) => field.id === updatedField.id);
                        if (fieldIndex !== -1) {
                            section.fields[fieldIndex] = updatedField;
                        }
                    }
                }),
        }))
    )
);
