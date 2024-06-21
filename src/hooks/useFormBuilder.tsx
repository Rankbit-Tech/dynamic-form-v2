import { fieldTypes } from "@constants/fieldTypes";
import { useFormStore } from "@store/useFormStore";

type RecordType = Record<string, any>;
type RecordArray = Record<string, any>[];

//remove below line

const log = console.log

const useFormBuilder = () => {
    const { setFields } = useFormStore((state) => state);

    const addField = (newField: RecordType) => {
        setFields((fields: RecordArray) => [...fields, newField]);
    };

    const insertFieldAtIndex = (targetField: RecordType, newField: RecordType, position: string) => {
        setFields((fields: RecordArray) => {
            const newFields = [...fields];
            const index = fields.findIndex((field) => field.id === targetField.id);

            if (position === "top") {
                newFields.splice(index, 0, newField);
            } else if (position === "bottom") {
                newFields.splice(index + 1, 0, newField);
            }

            return newFields;
        });
    };

    const handleDragEnd = (event: RecordType) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        log(activeData.type == fieldTypes.STEPPER && overData.type != fieldTypes.CANVAS)
        if (activeData.type == fieldTypes.STEPPER && overData.type != fieldTypes.CANVAS) return

        const isDroppingOnCanvas = overData.type == fieldTypes.CANVAS && activeData.type === fieldTypes.STEPPER;
        const isDroppingOnStepper = overData.type === fieldTypes.STEPPER && activeData.type !== fieldTypes.STEPPER;
        const isDroppingOnSection = overData.type === fieldTypes.SECTION;
        const isDroppingOnField = overData.type === fieldTypes.TEXT;


        if (isDroppingOnCanvas) {
            addField(activeData);
        } else if (isDroppingOnStepper) {
            handlePositionedDrop(overData, activeData);
        } else if (isDroppingOnSection) {
            handlePositionedDrop(overData, activeData, overData.parentId);
        } else if (isDroppingOnField) {
            handlePositionedDrop(overData, activeData, overData.parentId);
        }
    };

    const handlePositionedDrop = (overData: RecordType, activeData: RecordType, parentId: string = overData.id) => {
        const { position } = overData;
        if (position === "top" || position === "bottom") {
            activeData.parentId = parentId;
            insertFieldAtIndex(overData, activeData, position);
        } else {
            activeData.parentId = overData.id;
            addField(activeData);
        }
    };

    return {
        handleDragEnd,
    };
};

export default useFormBuilder;
