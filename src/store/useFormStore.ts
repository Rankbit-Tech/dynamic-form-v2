import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];

interface Field {
  label: string;
  value: string;
}

interface Step {
  title: string;
  fields: Field[];
}
export type FormConfig = {
  initialValues?: any;
  context?: any;
};
interface FormState {
  fields: recordArray;
  isPreview: boolean;
  selectedField: RecordType | null;
  formValues: RecordType;
  formConfig?: FormConfig;
  metadata?: {
    name: string
    version: number
  }
  setSelected: (data: RecordType | null) => void;
  setFields: (data: RecordType | null) => void;
  setIsPreview: (flag: boolean) => void;
  setFormValues: (callback: Function) => void;
  getSummary: () => Step[];
  setFormConfig: (data?: FormConfig) => void;
  setMetadata: (callback: Function | FormState['metadata']) => void
}

export const useFormStore = create<FormState>()(
  devtools(
    immer((set, get) => ({
      fields: [],
      isPreview: false,
      selectedField: null,
      formValues: {},
      formConfig: {},
      metadata: {
        name: '',
        version: 1
      },
      setSelected: (data: RecordType | null) => {
        set((state: FormState) => {
          state.selectedField = data;
        });
      },
      setIsPreview: (flag: boolean) => {
        set((state: FormState) => {
          state.isPreview = flag;
          state.formValues = {};
        });
      },
      setFields: (callback: any) => {
        set((state: FormState) => {
          state.fields = callback(get().fields);
        });
      },
      setFormValues: (callback: any) => {
        set((state: FormState) => {
          state.formValues = callback(get().formValues);
        });
      },

      getSummary: () => {
        const { fields, formValues } = get();

        const groupedFields = fields.reduce((acc, field) => {
          if (field.variant === "FIELD") {
            const step = fields.find(
              (stepField) =>
                stepField.id === field.parentId &&
                stepField.variant === "STEPPER",
            );
            if (step) {
              if (!acc[step.id]) {
                acc[step.id] = {
                  title: step.title,
                  fields: [],
                };
              }

              acc[step.id].fields.push({
                label: field.label,
                value: formValues[field.name] || "No value",
              });
            }
          }
          return acc;
        }, {});
        return Object.values(groupedFields);
      },

      setFormConfig: (data?: FormConfig) => {
        set((state: FormState) => {
          state.formConfig = data;
        });
      },
      setMetadata: (callback: Function | FormState['metadata']) => {
        set((state: FormState) => {
          if (typeof callback == "function") {
            state.metadata = callback(get().metadata)
          } else {
            state.metadata = callback
          }
        })
      }
    })),
    {
      name: "dynamic-form"
    }
  )

);
