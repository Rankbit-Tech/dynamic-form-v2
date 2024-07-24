import Renderer from "./Renderer"
import FormBuilderPage from "./FormBuilderPage"
import { useFormStore } from "@store/useFormStore"
import "../index.css"

const Builder = () => {

    const { isPreview } = useFormStore(state => state)

    return (
        <>
            {isPreview ? <Renderer /> : <FormBuilderPage />}
        </>
    )
}

export default Builder