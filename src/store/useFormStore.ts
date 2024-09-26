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
  setFormValues: (callback: Function) => void;
  getSummary: () => Step[];
  setFormConfig: (data?: FormConfig) => void;
  setMetadata: (callback: Function | FormState['metadata']) => void
  reset: (fullReset: boolean | undefined) => void
}
const test = [
  {
    id: 'fhmk5ukJ9dLJfJPzyCWh1',
    type: 'STEPPER',
    variant: 'STEPPER',
    title: 'Step'
  },
  {
    id: '-GspfcIC_1-oK3f8iUUis',
    type: 'GRID',
    variant: 'GRID',
    cols: 2,
    placement: 'start',
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'fhmk5ukJ9dLJfJPzyCWh1'
  },
  {
    id: 'NVDAAChKrJULZuTKH599J',
    type: 'SAMEASABOVE',
    variant: 'FIELD',
    label: 'Same As Above',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'fhmk5ukJ9dLJfJPzyCWh1',
    options: [
      {
        label: 'fname',
        value: 'sfname'
      },
      {
        label: 'lname',
        value: 'slname'
      }
    ],
    mapFields: {},
    config: {}
  },
  {
    id: 'mvXrVXLwSyoJ36m9ZTQKq',
    type: 'GRID',
    variant: 'GRID',
    cols: 2,
    placement: 'start',
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'fhmk5ukJ9dLJfJPzyCWh1'
  },
  {
    id: 'Co9OxSM9f9obj3z_X93hA',
    type: 'SUMMARY',
    variant: 'SUMMARY',
    label: 'Label',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'fhmk5ukJ9dLJfJPzyCWh1'
  },
  {
    id: 'KKHHxDW9_ALg8j7zU48mo',
    type: 'INPUT',
    variant: 'FIELD',
    label: 'First Name',
    name: 'fname',
    placeholder: 'Placeholder',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: '-GspfcIC_1-oK3f8iUUis',
    mapFields: {},
    config: {}
  },
  {
    id: 'WwoTxv4QRi6t1z7Lzt4ek',
    type: 'INPUT',
    variant: 'FIELD',
    label: 'Last Name',
    name: 'lname',
    placeholder: 'Placeholder',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: '-GspfcIC_1-oK3f8iUUis',
    mapFields: {},
    config: {}
  },
  {
    id: 'ptkb0pHYoLvUWYw8b9yTj',
    type: 'INPUT',
    variant: 'FIELD',
    label: 'same first name',
    name: 'sfname',
    placeholder: 'Placeholder',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'mvXrVXLwSyoJ36m9ZTQKq',
    mapFields: {},
    config: {}
  },
  {
    id: 'xjsyaVmqSCqVJAuMtF1GW',
    type: 'INPUT',
    variant: 'FIELD',
    label: 'same last',
    name: 'slname',
    placeholder: 'Placeholder',
    validations: {},
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'mvXrVXLwSyoJ36m9ZTQKq',
    mapFields: {},
    config: {}
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
                      value: _value || "No value",
                      name: summaryField.name
                    });
                  });
              } else {
                const _value = field.variant == "IMAGE" ? field?.src : formValues[field.name];
                acc[step.id].fields.push({
                  label: field.label,
                  value: _value || "No value",
                  name: field.name
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
