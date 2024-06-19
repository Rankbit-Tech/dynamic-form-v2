import { fieldTypes } from "@constants/fieldTypes";
import { useFormStore } from "@store/useFormStore";

type record = Record<string, any>
type recordArray = Record<string, any>[]
const log = console.log


const useFormBuilder = () => {

    const { setFields } = useFormStore(state => state)


    const addFields = (active: record) => {
        setFields((fields: recordArray) => {
            return [...fields, active]
        })
    }

    const insertAtIndex = (over: record, active: record, position: string) => {
        setFields((fields: recordArray) => {
            const newElement = [...fields]
            const index = fields.findIndex(field => field.id == over.id)
            console.log({ index })
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
            addFields(activeData)
        }

        if (overData.type == fieldTypes.STEPPER) {
            if ((overData?.position == "top" || overData?.position == "bottom") && activeData.type == fieldTypes.STEPPER) {
                const { position } = overData
                insertAtIndex(overData, activeData, position)
            } else {
                activeData.parentId = overData.id
                addFields(activeData)
            }
        }

        if (overData.type == fieldTypes.SECTION) {
            if ((overData?.position == "top" || overData?.position == "bottom")) {
                const { position } = overData
                activeData.parentId = overData.parentId
                console.log({ overData })
                insertAtIndex(overData, activeData, position)
            } else {
                activeData.parentId = overData.id
                addFields(activeData)
            }


        }

    }

    return {
        handleDragEnd
    }
};

export default useFormBuilder;
