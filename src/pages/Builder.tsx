import Renderer from "./Renderer";
import FormBuilderPage from "./FormBuilderPage";
import { useFormStore } from "@store/useFormStore";
import "../index.css";
import { FormBuilderPageProps } from "types";

const Builder = ({ onFormSave }: FormBuilderPageProps) => {
  const { isPreview } = useFormStore((state) => ({
    isPreview: state.isPreview,
  }));

  return (
    <>
      {isPreview ? (
        <Renderer isPreview={true} />
      ) : (
        <FormBuilderPage onFormSave={onFormSave} />
      )}
    </>
  );
};

export default Builder;
