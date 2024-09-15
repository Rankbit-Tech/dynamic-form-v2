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
  expression: string | null,
  formValues?: any,
  context?: any,
) => {
  if (
    !expression ||
    !expression.startsWith("{{") ||
    !expression.endsWith("}}")
  ) {
    return expression;
  }

  const dataPath = expression.slice(2, -2)?.trim();

  const [key, ...path] = dataPath.split(".");

  if (key === "context") {
    return get(context, path.join("."));
  } else {
    return get(formValues, path.join("."));
  }
};
