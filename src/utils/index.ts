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
  _expression: string | null,
  formValues?: any,
  context?: any,
) => {

  const expression = _expression?.trim();
  if (
    !expression ||
    !expression.startsWith("{{") ||
    !expression.endsWith("}}")
  ) {
    return expression;
  }

  const dataPath = expression?.trim()?.slice(2, -2);
  const [key, ...path] = dataPath.split(".").map(v => v.trim());

  if (key === "context") {
    return get(context, path.join("."));
  } else {
    return get(formValues, path.join("."));
  }
};
