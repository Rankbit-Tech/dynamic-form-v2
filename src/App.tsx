import FormBuilderPage from "@pages/FormBuilderPage"
import Renderer from "@pages/Renderer"
import { useFormStore } from "@store/useFormStore"

function App() {

  const { isPreview } = useFormStore(state => state)

  return (
    <>
      {isPreview ? <Renderer /> : <FormBuilderPage />}
    </>
  )
}

export default App
