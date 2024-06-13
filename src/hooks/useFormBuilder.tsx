import { fieldTypes } from "@constants/fieldTypes";
import { useFormStore } from "@store/useFormStore";

type record = Record<string, any>
type recordArray = Record<string, any>[]
const log = console.log


const useFormBuilder = () => {

    const { setSection } = useFormStore(state => state)

    const addStepper = (active: record) => {
        setSection((fields: recordArray) => {
            return [...fields, active]
        })
    }

    const handleDragEnd = (event: record) => {
        const { active, over } = event

        if (!active || !over) return
        if (active.id == over.id) return

        const activeData = active.data.current;
        const overData = over.data.current;
        const activeType = active.data.current.type;

        if (over.id == "droppable" && activeType == fieldTypes.STEPPER) {
            addStepper(activeData)
        }
    }

    return {
        handleDragEnd
    }
};

export default useFormBuilder;
