import { Step } from "types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];

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
  setFormValues: (callback: (values:RecordType) => RecordType) => void;
  getSummary: () => Step[];
  getSummaryV2: () => void;
  setFormConfig: (data?: FormConfig) => void;
  setMetadata: (callback: Function | FormState['metadata']) => void
  reset: (fullReset: boolean | undefined) => void
  setFieldValues:(name:string,data:RecordType) => void
}

type Summary = Record<string, Record<string, any>>;

const test = [
  {
    id: 'B9lw1Vyn9yFlt0HlRaoHn',
    type: 'STEPPER',
    variant: 'STEPPER',
    title: 'Step'
  },
  {
    id: 'AhD0FhYHZE8NB_ft11_-u',
    type: 'UPLOADDOCUMENTS',
    variant: 'FIELD',
    label: 'File Upload Label',
    name: 'file',
    validations: {
      required: false,
      maxCount: 1,
      accept: '',
      maxSize: null
    },
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'B9lw1Vyn9yFlt0HlRaoHn',
    options: [
      {
        label: 'Aadhar Card',
        value: 'aadharCard',
        isRequired:true
      },
      {
        label: 'Pan Card',
        value: 'panCard'
      }
    ],
    headers: [
      {
        key: 'token',
        value: 'json'
      }
    ],
    mapFields: {},
    config: {
      endpoint: 'http://localhost:3000/upload',
      requestType: 'POST',
      fileNamePrefix: 'vyn_dev/NTPC/regular_workmen/'
    }
  }
]
export const useFormStore = create<FormState>()(
  devtools(
    immer((set, get) => ({
      fields: test,
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
      setFormValues: (callback) => {
        set((state: FormState) => {
          state.formValues = callback(get().formValues);
        });
      },

      getSummary: () => {
        const { fields, formValues } = get();

        const groupedFields = fields.reduce((acc, field) => {
          if (["FIELD", "GRID", "IMAGE", "SECTION"].includes(field.variant)) {
            const step = fields.find(
              (stepField) =>
                stepField.id === field.parentId &&
                stepField.variant === "STEPPER"
            );

            if (step) {

              if (!acc[step.id]) {
                acc[step.id] = {
                  title: step.title,
                  fields: [],
                  type: '',
                  name: ''
                };
              }

              if (field.variant === "GRID") {
                fields
                  .filter(summaryField => summaryField.parentId === field.id)
                  .forEach((summaryField) => {
                    const _value = summaryField.variant == "IMAGE" ? summaryField?.src : formValues[summaryField.name]
                    acc[step.id].fields.push({
                      label: summaryField.label,
                      value: _value || "",
                      type: summaryField.type,
                      name: summaryField.name,
                    });
                  });
              } else {
                const _value = field.variant == "IMAGE" ? field?.src : formValues[field.name];
                acc[step.id].fields.push({
                  label: field.label,
                  value: _value || "",
                  type: field.type,
                  name: field.name
                });
              }
            }
          }
          return acc;
        }, {});
        return Object.values(groupedFields);
      },
      getSummaryV2: () => {
        const { fields, formValues } = get();

        const groupedFields: Summary = {};

        const processFields = (fieldsList: recordArray, parentId: string, stepTitle: string) => {
          fieldsList.forEach(field => {
            if (field.parentId === parentId) {
              if (field.variant === "SECTION") {
                // Recursively process nested sections
                processFields(fieldsList, field.id, stepTitle);
              } else {
                if (!groupedFields[stepTitle]) {
                  groupedFields[stepTitle] = {};
                }

                let value = field.variant === "IMAGE" ? field.src || "" : formValues[field.name || ""] || "";

                if (field.variant === "GRID") {
                  const gridFields = fieldsList.filter(f => f.parentId === field.id);
                  gridFields.forEach(gridField => {
                    let gridValue = gridField.variant === "IMAGE" ? gridField.src || "" : formValues[gridField.name || ""] || "";
                    groupedFields[stepTitle][gridField.name || ""] = gridValue;
                  });
                } else {
                  if (field.name) {
                    groupedFields[stepTitle][field.name] = value;
                  }
                }
              }
            }
          });
        };

        // Loop through all stepper fields
        fields.forEach(step => {
          if (step.variant === "STEPPER" && step.title) {
            processFields(fields, step.id, step.title);
          }
        });

        return groupedFields;
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
      },
      setFieldValues: (name: string, data: RecordType) => {
        set((state: FormState) => {
          if (name) {
            state.fields = state.fields.map((field: RecordType) => {
              if (field.name === name) {
                return {
                  ...field,
                  values: data
                };
              }
              return field;
            });
          }
        });
      }
    })),
    {
      name: "dynamic-form"
    }
  )

);
