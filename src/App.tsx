import FormBuilderPage from "@pages/FormBuilderPage";
import Renderer from "@pages/Renderer";
import { useFormStore } from "@store/useFormStore";
import axios from "axios";
import { useMemo } from "react";

function App() {
  const formConfig = useMemo(
    () => ({
      initialValues: {},
      context: {
        org: "NTPC",
      },
    }),
    []
  );

  const { isPreview } = useFormStore((state) => state);
  const onFormSubmit = async (formData: any) => {
    try {
      const response = await axios.post("http://localhost:3000/submit", {
        response: formData,
      });

      if (!response.status) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const onFormSave = (schema: any) => {
    console.log(schema, "Schema");
  };
  return (
    <>
      {isPreview ? (
        <Renderer
          formConfig={formConfig}
          onFormSubmit={onFormSubmit}
          isPreview={true}
        />
      ) : (
        <FormBuilderPage onFormSave={onFormSave} />
      )}
    </>
  );
}

export default App;
