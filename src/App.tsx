import FormBuilderPage from "@pages/FormBuilderPage";
import Renderer from "@pages/Renderer";
import { useFormStore } from "@store/useFormStore";
import { useMemo } from "react";

function App() {
  const formConfig = useMemo(
    () => ({
      initialValues: {
        image: [
          "http://localhost:3000/uploads/1743106372384-Screenshot%202025-03-26%20145643.png",
          "http://localhost:3000/uploads/1743106151609-Screenshot%202025-03-26%20145643.png",
        ],
      },
      context: {},
    }),
    []
  );

  const { isPreview } = useFormStore((state) => state);
  const onFormSubmit = async (formData: FormData) => {
    for (let [key, value] of formData.entries()) {
      // console.log(`${key}:`, value);
    }
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
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
