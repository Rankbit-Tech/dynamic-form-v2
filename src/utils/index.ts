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
