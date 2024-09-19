import { FormConfig } from "@store/useFormStore";
import { resolveExpression } from "@utils/index";
import { message } from "antd";
import { get } from "lodash";
import { useState, useEffect, useMemo, useCallback } from "react";

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

  const { formConfig, formValues } = props;
  const { context } = formConfig || {};

  const getValuesOfFields = useCallback(
    (fieldsToKeepTrack: string) => {
      const result: any = {};

      fieldsToKeepTrack?.split("||")?.forEach((field) => {
        result[field] = get(formValues, field);
      });
      return result;
    },
    [formValues],
  );

  const { fieldsToKeepTrack, allFields } = useMemo(() => {
    if (props.optionSource === "api") {
      const {
        endpoint: rawEndpoint,
        headers: rawHeaders = [],

        queryParams = [],
      } = props;

      const usedVariable = [
        rawEndpoint,
        rawHeaders?.map((header: any) => header.key).join(", "),
        rawHeaders?.map((header: any) => header.value).join(", "),
        queryParams?.map((param: any) => param.key).join(", "),
        queryParams?.map((param: any) => param.value).join(", "),
      ]
        .join(", ")
        .match(/{{([a-zA-Z0-9._]+)}}/gm);

      const formFieldsInVariable = usedVariable
        ?.filter((variable) => {
          return variable.includes("formValues");
        })
        .map((variable) =>
          variable
            .replace("{{", "")
            .replace("}}", "")
            .replace("formValues.", ""),
        )
        .join("||");
      return {
        fieldsToKeepTrack: formFieldsInVariable || "",
        allFields: usedVariable?.join("||") || "",
      };
    }
    return {
      fieldsToKeepTrack: "",
      allFields: "",
    };
  }, [props]);

  const valuesOfFields = useMemo(() => {
    return getValuesOfFields(fieldsToKeepTrack || "");
  }, [fieldsToKeepTrack, getValuesOfFields]);

  const fieldsToKeepTrackFromContext = useMemo(() => {
    const usedVariable = allFields.split("||");
    const variables = usedVariable
      ?.filter((variable) => variable.includes("context"))
      ?.map((variable) =>
        variable.replace("{{", "").replace("}}", "").replace("formValues.", ""),
      );

    const resolvedValues = variables?.map((variable) => {
      return resolveExpression(`{{${variable}}}`, formValues, context);
    });

    const formFieldVariables = resolvedValues
      .join(", ")
      .match(/{{([a-zA-Z0-9._]+)}}/gm)
      ?.filter((variable) => {
        return variable.includes("formValues");
      })
      ?.map((variable) =>
        variable.replace("{{", "").replace("}}", "").replace("formValues.", ""),
      );

    return formFieldVariables?.join("||") || "";
  }, [allFields, context, formValues]);

  const valuesOfResolvedFields = useMemo(() => {
    return getValuesOfFields(fieldsToKeepTrackFromContext || "");
  }, [fieldsToKeepTrackFromContext, getValuesOfFields]);

  const stringiFiedValues = JSON.stringify({
    valuesOfFields,
    valuesOfResolvedFields,
  });

  const { headers, requestType, body, url } = useMemo(() => {
    if (props.optionSource === "api") {
      try {
        const {
          endpoint: rawEndpoint,
          headers: rawHeaders,
          requestType,
          queryParams,
        } = props;

        const endpoint = resolveExpression(rawEndpoint, formValues, context);

        const headers = (rawHeaders || []).reduce((acc, header) => {
          acc[resolveExpression(header.key, formValues, context)] =
            resolveExpression(header.value, formValues, context);
          return acc;
        }, {});

        const body = props.requestBody?.reduce((acc, body) => {
          acc[resolveExpression(body.key, formValues, context)] =
            resolveExpression(body.value, formValues, context);
          return acc;
        }, {});

        const url = new URL(resolveExpression(endpoint, formValues, context));

        queryParams?.forEach((param) => {
          url.searchParams.append(
            resolveExpression(param.key, formValues, context),
            resolveExpression(param.value, formValues, context),
          );
        });

        return {
          endpoint,
          headers: JSON.stringify(headers),
          requestType,
          body: JSON.stringify(body),
          url: url.toString(),
        };
      } catch (error: Error | any) {
        message.error(error.message);
      }
    }
    return {};
  }, [context, formValues, props]);

  const labelKey = (props as ApiSelectInputProps).labelKey;
  const valueKey = (props as ApiSelectInputProps).valueKey;
  const dataPath = (props as ApiSelectInputProps).dataPath;

  const getOptionFields = useCallback(
    (item: Record<string, any>) => {
      const values = {
        ...(valuesOfFields || {}),
        ...(valuesOfResolvedFields || {}),
      };

      return {
        label: get(item, resolveExpression(labelKey, values, context)),
        value: get(item, resolveExpression(valueKey, values, context)),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labelKey, valueKey, stringiFiedValues, context],
  );

  useEffect(() => {
    if (props.optionSource === "api" && url) {
      try {
        const getData = async () => {
          setLoading(true);
          const response = await fetch(url, {
            method: requestType,
            headers: headers ? JSON.parse(headers) : null,
            body,
          });
          const data = await response.json();
          setLoading(false);
          let opts = data;
          if (dataPath?.trim()) {
            opts = get(data, dataPath);
          }
          const finalOptions =
            opts?.map((item: Record<string, any>) => getOptionFields(item)) ||
            [];

          setOptions(finalOptions);
        };
        getData();
      } catch (error: Error | any) {
        message.error(error.message);
      }
    }
  }, [
    headers,
    requestType,
    body,
    url,
    props.optionSource,
    context,
    getOptionFields,
    dataPath,
  ]);

  return { loading, options };
};
