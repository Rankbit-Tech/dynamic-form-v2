import { fieldTypes } from "@constants/fieldTypes";
import { useFormStore } from "@store/useFormStore";

type record = Record<string, any>
type recordArray = Record<string, any>[]
const log = console.log


const useFormBuilder = () => {

    const { setSection, setSteps, setFields } = useFormStore(state => state)


    const addAnyFields = (active: record, func: any) => {
        func((fields: recordArray) => {
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
            addAnyFields(activeData, setSteps)
        }
        console.log({ overData })

        if (overData.type == fieldTypes.STEPPER) {
            if ((overData?.position == "top" || overData?.position == "bottom") && activeData.type == fieldTypes.STEPPER) {
                const { position } = overData
                insertAtIndex(overData, activeData, setSteps, position)
            } else {
                activeData.parentId = overData.id

                switch (activeType) {
                    case fieldTypes.SECTION:
                        addAnyFields(activeData, setSection)
                        return

                    case fieldTypes.TEXT:
                        addAnyFields(activeData, setFields)
                        return

                    default:
                        break;
                }
            }
        }

        if (overData.type == fieldTypes.SECTION) {

            if ((overData?.position == "top" || overData?.position == "bottom")) {
                const { position } = overData
                activeData.parentId = overData.id

                log(overData, activeData)
                let calllback = activeType == fieldTypes.SECTION ? setSection : setFields
                insertAtIndex(overData, activeData, calllback, position)
            } else {
                activeData.parentId = overData.id

                switch (activeType) {
                    case fieldTypes.SECTION:
                        addAnyFields(activeData, setSection)
                        return

                    case fieldTypes.TEXT:
                        addAnyFields(activeData, setFields)
                        return

                    default:
                        break;
                }
            }


        }

    }

    return {
        handleDragEnd
    }
};

export default useFormBuilder;
