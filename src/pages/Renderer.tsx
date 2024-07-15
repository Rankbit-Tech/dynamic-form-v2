import Preview from "@components/organisms/Preview"
import { useFormStore } from "@store/useFormStore"
import { transformData } from "@utils/transform"

const Renderer = () => {

    const formData = useFormStore(state => transformData(state.fields))

    const onFormSubmit = (formData: FormData) => {
        console.log({ formData })
    }
    return (
        <Preview data={formData} onSubmit={onFormSubmit} />
    )
}

export default Renderer