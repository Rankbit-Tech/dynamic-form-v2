import { Form } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { useFormStore } from "@store/useFormStore";

const useEvaluteValue = () => {
  const form = Form.useFormInstance();
  const { fields } = useFormStore();
  const previousValues = useRef<Record<string, any>>({});

  const evaluateValue = useCallback(
    (value: string) => {
      if (!value || typeof value !== "string") return value;

      // Match patterns like {{fieldName}}
      const templateRegex = /\{\{([^}]+)\}\}/g;
      let result = value;

      // Replace all template literals with actual values
      result = result.replace(templateRegex, (match, field) => {
        const fieldName = field.trim();
        // Get the complete field value
        const fieldValue = form.getFieldValue(fieldName);

        // Handle different types of values
        if (fieldValue === undefined || fieldValue === null) return "";
        if (typeof fieldValue === "string") return fieldValue;
        if (typeof fieldValue === "number") return fieldValue.toString();
        if (Array.isArray(fieldValue)) return fieldValue.join(" ");
        if (typeof fieldValue === "object") return JSON.stringify(fieldValue);

        return String(fieldValue);
      });

      // Remove any extra spaces that might be left after removing template literals
      result = result.replace(/\s+/g, " ").trim();

      return result;
    },
    [form]
  );

  // Update field values when any field changes
  useEffect(() => {
    const updateCustomValues = () => {
      const updates: Record<string, any> = {};

      fields.forEach((field) => {
        if (field.validations?.customValue) {
          const evaluatedValue = evaluateValue(field.validations.customValue);
          // Only update if the value has changed
          if (previousValues.current[field.name] !== evaluatedValue) {
            updates[field.name] = evaluatedValue;
            previousValues.current[field.name] = evaluatedValue;
          }
        }
      });

      // Update all custom value fields at once
      if (Object.keys(updates).length > 0) {
        form.setFieldsValue(updates);
      }
    };

    // Set up an interval to check for changes
    const interval = setInterval(() => {
      updateCustomValues();
    }, 100);

    // Initial update
    updateCustomValues();

    return () => {
      clearInterval(interval);
    };
  }, [fields, evaluateValue, form]);

  return { evaluateValue };
};

export default useEvaluteValue;
