import FormBuilderPage from "@pages/FormBuilderPage";
import Renderer from "@pages/Renderer";
import { useFormStore } from "@store/useFormStore";
import { useMemo } from "react";

function App() {
  const formConfig = useMemo(() => {
    return {
      initialValues: {
        gender: "male",
      },
      context: {
        select1: {
          endpoint: "https://jsonplaceholder.typicode.com/users",
          valueKey: "id",
          labelKey: "name",
          dataPath: "",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          prop: {
            dataSource: {
              type: "api",
              config: [
                {
                  url: "https://jsonplaceholder.typicode.com/users",
                  method: "GET",
                  key: "id",
                  value: "name",
                },
              ],
            },
          },
        },
      },
    };
  }, []);

  const { isPreview } = useFormStore((state) => state);

  return (
    <>
      {isPreview ? <Renderer formConfig={formConfig} /> : <FormBuilderPage />}
    </>
  );
}

export default App;
