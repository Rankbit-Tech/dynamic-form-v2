import { useCallback, useEffect, useMemo } from "react";
import { FormInstance, useWatch } from "antd/es/form/Form";
import { Rule, evaluateConditions } from "@lib/condition";
import INPUT_FIELDS from "@constants/inputFieldConstants";
import { fieldTypes } from "@constants/fieldTypes";
import { FormConfig, useFormStore } from "@store/useFormStore";

export type Step = {
  title: string;
  children: Record<string, any>[];
};
interface SameAsAboveOption {
  label: string;
  value: string;
}
interface FormValues {
  [key: string]: any;
}

const renderStep = (
  steps: Record<string, any>[],
  formValues: any,
  formConfig?: FormConfig,
) => {
  return steps.map((step) => {
    const RenderComponent = INPUT_FIELDS[step.type]?.renderComponent;
    if (!RenderComponent) return null;

    let shouldHide = false;
    let isDisabled = false;
    if (step.conditions && step.conditions.rules.length > 0) {
      const { hide, disable } = evaluateConditions(step.conditions, formValues);
      shouldHide =
        hide &&
        step.conditions.rules.some((rule: Rule) => rule.value === "hide");
      isDisabled =
        disable &&
        step.conditions.rules.some((rule: Rule) => rule.value === "disable");
    }

    if (shouldHide) {
      return null;
    }

    if (step.type === fieldTypes.SECTION) {
      const children = renderStep(step.children, formValues, formConfig);
      return (
        <RenderComponent
          childrenComponent={children}
          key={step.id}
          {...step}
          formConfig={formConfig}
        />
      );
    }
    if (step.type === fieldTypes.GRID) {
      const children = renderStep(step.children, formValues, formConfig);

      return (
        <RenderComponent
          childrenComponent={children}
          key={step.id}
          {...step}
          formConfig={formConfig}
        />
      );
    }

    return (
      <div key={step.id}>
        {step.children && step.children.length > 0 ? (
          renderStep(step.children, formValues, formConfig)
        ) : (
          <RenderComponent
            key={step.id}
            {...step}
            disabled={isDisabled}
            formConfig={formConfig}
            formValues={step.type === fieldTypes.SELECT ? formValues : null}
          />
        )}
      </div>
    );
  });
};

const usePreview = (form: FormInstance, data: Record<string, any>) => {

  const formValues = useWatch([], form) || {};


  const [sameAsAboveOptions, formConfig, current, setCurrent, setFormValues] = useFormStore((state) => {
    return [
      state.fields?.find((field) => field.type == fieldTypes.SAMEASABOVE)
        ?.options || [],
      state.formConfig,
      state.current,
      state.setCurrent,
      state.setFormValues
    ];
  });

  const items = useMemo(() => {
    return data?.map((step: Step, index: number) => ({
      key: index.toString(),
      title: step.title,
      content: renderStep(step.children, formValues, formConfig),
    }));
  }, [data, formConfig, formValues]);

  const handleValueChange = useCallback((_: any, allValues: any) => {
    setFormValues((oldValues: any) => {
      return { ...oldValues, ...allValues }
    })
  }, [setFormValues])

  const saveAsAbove = form.getFieldValue("sameAsAbove");


  useEffect(() => {
    const updatedValues: FormValues = {};

    sameAsAboveOptions?.forEach(({ label, value }: SameAsAboveOption) => {
      updatedValues[value] = saveAsAbove ? form.getFieldValue(label) : ""; // Copy or clear values
    });

    form.setFieldsValue(updatedValues);

    handleValueChange(null, { ...form.getFieldsValue(), ...updatedValues });

  }, [saveAsAbove, form, sameAsAboveOptions]);

  const next = useCallback(() => {
    form.validateFields().then(() => {
      setCurrent((prev: number) => prev + 1);
    });
  }, [form]);

  const prev = useCallback(() => {
    setCurrent((prev: number) => prev - 1);
  }, []);

  return {
    current,
    next,
    prev,
    items,
    handleValueChange
  };
};

export default usePreview;
