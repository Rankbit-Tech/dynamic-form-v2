import { FormConfig } from "@store/useFormStore";
import { resolveExpression } from "@utils/index";
import { get } from "lodash";
import { useState, useEffect } from "react";

interface SelectApiProps {
  optionSource: "api";
  endpoint: string;
  headers?: Record<string, any>[] | null;
  labelKey: string;
  valueKey: string;
  dataPath?: string;
  queryParams?: Record<string, any>[] | null;
  requestType: "GET" | "POST" | "PUT" | "DELETE";
  requestBody?: Record<string, any>[] | null;
}

interface BaseSelectInputProps {
  label: string;
  name: string;
  defaultValue: string;
  validations: Record<string, any>;
  formConfig?: FormConfig;
  options: { label: string; value: string }[];
  formValues?: any;
}

interface ManualSelectInputProps extends BaseSelectInputProps {
  optionSource: "manual";
}

interface ApiSelectInputProps extends BaseSelectInputProps, SelectApiProps {
  optionSource: "api";
}

export type SelectInputProps = ManualSelectInputProps | ApiSelectInputProps;

export const useSelectOptions = (props: SelectInputProps) => {
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<SelectInputProps["options"]>(() => {
    return [
      { label: `Select ${props.label}`, value: "" },
      ...(props.options || []),
    ];
  });

  useEffect(() => {
    const { formConfig } = props;

    if (props.optionSource === "api") {
      const {
        endpoint: rawEndpoint,
        headers: rawHeaders,
        requestType,
        formValues,
        queryParams,
      } = props;
      const { context } = formConfig || {};

      const endpoint = resolveExpression(rawEndpoint, formValues, context);

      const headers = (rawHeaders || []).reduce((acc, header) => {
        acc[header.key] = resolveExpression(header.value, formValues, context);
        return acc;
      }, {});

      const body = props.requestBody?.reduce((acc, body) => {
        acc[body.key] = resolveExpression(body.value, formValues, context);
        return acc;
      }, {});

      const url = new URL(endpoint);

      queryParams?.forEach((param) => {
        url.searchParams.append(
          param.key,
          resolveExpression(param.value, formValues, context),
        );
      });

      const getData = async () => {
        setLoading(true);
        const response = await fetch(url.toString(), {
          method: requestType,
          headers: headers,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setLoading(false);
        let opts = data;
        if (props.dataPath?.trim()) {
          opts = get(data, props.dataPath);
        }
        setOptions(
          opts.map((item: Record<string, any>) => ({
            // label: item[resolveExpression(props.labelKey, formValues, context)],
            // value: item[resolveExpression(props.valueKey, formValues, context)],

            label: get(item, resolveExpression(props.labelKey, formValues, context)),
            value: get(item, resolveExpression(props.valueKey, formValues, context)),
          })),
        );
      };
      getData();
    }
  }, [props]);

  return { loading, options };
};
