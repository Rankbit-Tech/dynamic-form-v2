import { useCallback, useEffect, useMemo, useState } from "react";
import { FormInstance, useWatch } from "antd/es/form/Form";
import { Rule, evaluateConditions } from "@lib/condition";
import INPUT_FIELDS from "@constants/inputFieldConstants";
import { fieldTypes } from "@constants/fieldTypes";
import { FormConfig, useFormStore } from "@store/useFormStore";

export type Step = {
  title: string;
  children: Record<string, any>[];
};

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
  const [current, setCurrent] = useState(0);
  const formValues = useWatch([], form) || {};

  const [saveAsAboveOptions, formConfig] = useFormStore((state) => {
    return [
      state.fields?.find((field) => field.type == fieldTypes.SAMEASABOVE)
        ?.options || [],
      state.formConfig,
    ];
  });

  const items = useMemo(() => {
    return data?.map((step: Step, index: number) => ({
      key: index.toString(),
      title: step.title,
      content: renderStep(step.children, formValues, formConfig),
    }));
  }, [data, formConfig, formValues]);

  const saveAsAbove = form.getFieldValue("sameAsAbove");

  useEffect(() => {
    if (saveAsAbove) {
      saveAsAboveOptions?.forEach(
        ({ label, value }: { label: string; value: string }) => {
          form.setFieldValue(value, form.getFieldValue(label));
        },
      );
    } else {
      saveAsAboveOptions?.forEach(({ value }: { value: string }) => {
        form.setFieldValue(value, "");
      });
    }
  }, [saveAsAbove, saveAsAboveOptions, form]);

  const next = useCallback(() => {
    form.validateFields().then(() => {
      setCurrent((prev) => prev + 1);
    });
  }, [form]);

  const prev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  return {
    current,
    next,
    prev,
    items,
  };
};

export default usePreview;
