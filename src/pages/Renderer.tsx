import Preview from "@components/organisms/Preview"
import { useFormStore } from "@store/useFormStore"
import { transformData } from "@utils/transform"

const Renderer = () => {

    const formData = useFormStore(state => transformData(state.fields))

    return (
        <Preview data={formData} />
    )
}

export default Renderer