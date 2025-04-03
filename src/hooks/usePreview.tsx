import { useCallback, useMemo } from "react";
import { FormInstance } from "antd/es/form/Form";
import { Rule, evaluateConditions } from "@lib/condition";
import INPUT_FIELDS from "@constants/inputFieldConstants";
import { fieldTypes } from "@constants/fieldTypes";
import { FormConfig, useFormStore } from "@store/useFormStore";
import { toCamelCase } from "@utils/index";

export type Step = {
  title: string;
  children: Record<string, any>[];
};

const renderStep = (
  steps: Record<string, any>[],
  formValues: any,
  formConfig?: FormConfig
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
  const { formConfig, current, setCurrent, setFormValues, fields } =
    useFormStore((state) => state);

  const items = useMemo(() => {
    return data?.map((step: Step, index: number) => ({
      key: index.toString(),
      title: step.title,
      content: renderStep(step.children, form.getFieldsValue(true), formConfig),
    }));
  }, [data, form, formConfig]);

  const handleValueChange = useCallback(
    (_: any, allValues: any) => {
      setFormValues((oldValues: any) => {
        return { ...oldValues, ...allValues };
      });
    },
    [setFormValues]
  );

  const next = useCallback(async () => {
    try {
      await form.validateFields(); // Validate form fields
      setCurrent((prev: number) => prev + 1);

      setFormValues((oldValues: any) => ({
        ...oldValues,
        ...form.getFieldsValue(true),
      }));
    } catch (error) {
      console.error("Validation failed:", error);
    }
  }, [form, setCurrent, setFormValues]);

  const prev = useCallback(() => {
    setCurrent((prev: number) => prev - 1);
  }, [setCurrent]);

  const findStepByFieldName = (field: any) => {
    if (!field) return undefined;
    if (field.variant == "STEPPER") {
      return toCamelCase(field.title);
    } else if (field.parentId) {
      const parent = fields.find((f) => f.id == field.parentId);
      return findStepByFieldName(parent);
    }
  };

  const formateDataStepWise = (values: Record<string, any>) => {
    const steps: Record<string, any> = {};

    Object.entries(values).forEach(([key, value]) => {
      const field = fields.find((f) => f.name == key);
      if (!field) return;
      const stepTitle = findStepByFieldName(field);

      if (!stepTitle) return;
      if (steps[stepTitle]) {
        steps[stepTitle] = { ...steps[stepTitle], [key]: value };
      } else {
        steps[stepTitle] = { [key]: value };
      }
    });
    return steps;
  };

  return {
    current,
    next,
    prev,
    items,
    handleValueChange,
    formateDataStepWise,
  };
};

export default usePreview;
