import Renderer from "./Renderer";
import FormBuilderPage from "./FormBuilderPage";
import { useFormStore } from "@store/useFormStore";
import "../index.css";
import { FormBuilderPageProps } from "types/types";

const Builder = ({ onFormSave }: FormBuilderPageProps) => {
  console.log("version : 1.4.1");
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
