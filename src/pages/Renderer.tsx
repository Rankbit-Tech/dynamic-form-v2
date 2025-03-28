import Preview from "@components/organisms/Preview";
import { FormConfig, useFormStore } from "@store/useFormStore";
import { transformData } from "@utils/transform";
import { FormInstance } from "antd";
import { useEffect } from "react";
import _ from "lodash";

type RendererProps = {
  formConfig?: FormConfig;
  onFormSubmit?: (formData: FormData, form?: FormInstance) => void;
  isPreview?: boolean;
  isUpdateState?: boolean;
  showSummaryOnly?: boolean;
};

const Renderer = ({
  formConfig,
  onFormSubmit,
  isPreview,
  isUpdateState,
  showSummaryOnly,
}: RendererProps) => {
  const [fields, setFormConfig] = useFormStore((state) => [
    state.fields,
    state.setFormConfig,
  ]);

  const formData = transformData(fields);

  useEffect(() => {
    if (formConfig) {
      const currentConfig = useFormStore.getState().formConfig;

      if (!_.isEqual(currentConfig, formConfig)) {
        setFormConfig(formConfig);
      }
    }
  }, [formConfig, setFormConfig]);

  return (
    <Preview
      isUpdateState={isUpdateState}
      showSummaryOnly={showSummaryOnly}
      data={formData}
      isPreview={isPreview}
      onSubmit={onFormSubmit}
    />
  );
};

export default Renderer;
