import Renderer from "./Renderer"
import FormBuilderPage from "./FormBuilderPage"
import { useFormStore } from "@store/useFormStore"
import "../index.css"

const Builder = ({ onFormSave }: FormBuilderPageProps) => {

    const { isPreview } = useFormStore(state => state)

    return (
        <>
            {isPreview ? <Renderer isPreview={true} /> : <FormBuilderPage onFormSave={onFormSave} />}
        </>
    )
}

export default Builder