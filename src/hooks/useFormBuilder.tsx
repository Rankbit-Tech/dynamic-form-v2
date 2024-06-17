import { fieldTypes } from "@constants/fieldTypes";
import { arrayMove } from "@dnd-kit/sortable";
import { useFormStore } from "@store/useFormStore";

type record = Record<string, any>
type recordArray = Record<string, any>[]
const log = console.log


const useFormBuilder = () => {

    const { setSection, setSteps, steps } = useFormStore(state => state)


    const addStepper = (active: record) => {
        setSteps((fields: recordArray) => {
            return [...fields, active]
        })
    }

    const insertAtIndex = (over: record, active: record, func: any, position: string) => {
        func((fields: recordArray) => {
            const newElement = [...fields]
            const index = fields.findIndex(field => field.id == over.id)

            if (position === "top") {
                newElement.splice(index, 0, active);
            } else if (position === "bottom") {
                newElement.splice(index + 1, 0, active);
            }
            return newElement
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

        if ((overData.position == "top" || overData.position == "bottom") && activeType == fieldTypes.STEPPER) {
            const { position } = overData
            insertAtIndex(overData, activeData, setSteps, position)
        }
    }

    return {
        handleDragEnd
    }
};

export default useFormBuilder;
