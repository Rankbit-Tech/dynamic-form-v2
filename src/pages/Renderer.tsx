import Preview from "@components/organisms/Preview";
import { FormConfig, useFormStore } from "@store/useFormStore";
import { transformData } from "@utils/transform";
import { startTransition, useEffect, useState } from "react";

type RendererProps = {
  formConfig?: FormConfig;
  onFormSubmit?: (formData: FormData) => void
};

const Renderer = ({ formConfig, onFormSubmit }: RendererProps) => {
  const [isConfigured, setConfigured] = useState(false);
  const [formData, setFormConfig] = useFormStore((state) => [
    transformData(formConfig?.schema || state.fields),
    state.setFormConfig,
  ]);

  useEffect(() => {
    setFormConfig(formConfig);
    startTransition(() => {
      setConfigured(true);
    });


  }, [formConfig, setFormConfig]);


  if (!isConfigured) {
    return null;
  }

  return <Preview data={formData} onSubmit={onFormSubmit} />;
};

export default Renderer;
