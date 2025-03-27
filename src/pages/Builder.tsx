import Renderer from "./Renderer";
import FormBuilderPage from "./FormBuilderPage";
import { useFormStore } from "@store/useFormStore";
import "../index.css";

const Builder = ({ onFormSave }: FormBuilderPageProps) => {
  console.log("version : 1.1.3");
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
