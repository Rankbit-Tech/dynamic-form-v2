import { useFormStore } from "@store/useFormStore";
import { get } from "lodash";

export const onlyNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
  if (allowedKeys.includes(e.key)) {
    return;
  }

  if (!/^\d*\.?\d*$/.test(e.key)) {
    e.preventDefault();
  }
};

export const resolveExpression = (
  _expression: string | null | undefined,
  formValues?: any,
  context?: any,
): any => {
  const expression = _expression?.trim();
  if (!expression || !/{{([a-zA-Z0-9._]+)}}/gm.test(expression)) {
    return expression;
  }

  if (!formValues) {
    formValues = useFormStore.getState().formValues;
  }

  if (!context) {
    context = useFormStore.getState().formConfig?.context;
  }

  const result = expression.replace(
    /{{([a-zA-Z0-9._]+)}}/gm,
    (_match, p1: string) => {
      const dataPath = p1?.trim();
      const [key, ...path] = dataPath.split(".").map((v) => v.trim());

      let value: any;

      if (key === "context") {
        value = get(context, path.join("."));
      } else if (key === "formValues") {
        value = get(formValues, path.join("."));
      }

      if (typeof value === "string" && /{{([a-zA-Z0-9._]+)}}/gm.test(value)) {
        return resolveExpression(value, formValues, context);
      }

      return value;
    },
  );

  return result;
};

export const toCamelCase = (str: string) =>
  str
    .replace(/-+/g, "_")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");   


export const urlToBlob = async (fileUrl: string): Promise<File> => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const filename = fileUrl.split("/").pop() || "file";
  return new File([blob], filename, { type: blob.type });
};

export const isImageUrl = (value:string) => {
  if (typeof value === "string") {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(value); // Check file extension
  }
  return false;
};

export const normalizeFileList = (value:string | string[]) => {
  if (!value) return [];

  if (typeof value === "string" && isImageUrl(value)) {
    return [{ uid: crypto.randomUUID(), name: value.split("/").pop(), status: "done", url: value }];
  }

  if (Array.isArray(value)) {
    return value
      .filter((url) => isImageUrl(url))
      .map((url) => ({
        uid: crypto.randomUUID(),
        name: url.split("/").pop(),
        status: "done",
        url,
      }));
  }

  return [];
};


export const getFormValues = (callback: (values: any, context: any) => any) => {
  const { formValues, formConfig } = useFormStore.getState();
  const context = formConfig?.context || {};
  return callback ? callback(formValues, context) : { values: formValues, context };
};

