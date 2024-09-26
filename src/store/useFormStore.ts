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
  current: number;
  metadata?: {
    name: string
    version: number
  }
  setCurrent: (callback: number | Function) => void;
  setSelected: (data: RecordType | null) => void;
  setFields: (data: RecordType | null) => void;
  setIsPreview: (flag: boolean) => void;
  setFormValues: (callback: Function) => void;
  getSummary: () => Step[];
  setFormConfig: (data?: FormConfig) => void;
  setMetadata: (callback: Function | FormState['metadata']) => void
  reset: (fullReset: boolean | undefined) => void
}

export const useFormStore = create<FormState>()(
  devtools(
    immer((set, get) => ({
      fields: [],
      isPreview: false,
      selectedField: null,
      formValues: {},
      formConfig: {},
      current: 0,
      metadata: {
        name: '',
        version: 1
      },
      setCurrent: ((callback: number | Function) => {
        set((state: FormState) => {

          if (typeof callback == "function") {
            state.current = callback(get().current)
          } else {
            state.current = callback
          }
        })
      }),
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
          if (["FIELD", "GRID", "IMAGE"].includes(field.variant)) {
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

              if (field.variant === "GRID") {
                fields
                  .filter(summaryField => summaryField.parentId === field.id)
                  .forEach((summaryField) => {
                    const _value = summaryField.variant == "IMAGE" ? summaryField?.src : formValues[summaryField.name]
                    acc[step.id].fields.push({
                      label: summaryField.label,
                      value: _value || "No value",
                    });
                  });
              } else {
                const _value = field.variant == "IMAGE" ? field?.src : formValues[field.name];
                acc[step.id].fields.push({
                  label: field.label,
                  value: _value || "No value",
                });
              }


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
      },
      reset: (fullReset: boolean | undefined) => {
        set((state: FormState) => {

          state.current = 0;
          state.formValues = {};
          state.selectedField = null

          if (fullReset) {
            state.fields = []
            state.isPreview = false;
            state.metadata = {
              name: '',
              version: 1
            }
          }
        })
      }
    })),
    {
      name: "dynamic-form"
    }
  )

);
