import Renderer from "./Renderer";
import FormBuilderPage from "./FormBuilderPage";
import { useFormStore } from "@store/useFormStore";
import "../index.css";
import { FormBuilderPageProps } from "types";

const Builder = ({ onFormSave, isUpdateState }: FormBuilderPageProps) => {
  console.log("version : 1.4.3");
  const { isPreview } = useFormStore((state) => ({
    isPreview: state.isPreview,
  }));

  return (
    <>
      {isPreview ? (
        <Renderer isUpdateState={isUpdateState} isPreview={true} />
      ) : (
        <FormBuilderPage onFormSave={onFormSave} />
      )}
    </>
  );
};

export default Builder;
