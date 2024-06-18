import { fieldTypes } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core"
import { useFormStore } from "@store/useFormStore";
import { cn } from "@utils/cn";
import { Card } from "antd"
import SectionDesigner from "./SectionDesigner";
import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";

const StepperDesigner = ({ field }: any) => {

    const sections = useFormStore(state => {
        return state.sections.filter((section: typeof state.sections) => section.stepId == field.id)
    });

    const step = useDroppable({
        id: `step-drop-${field.id}`,
        data: {
            id: field.id,
            type: fieldTypes.STEPPER
        }

    });
    const topHalf = useDroppable({
        id: `top-stepper-${field.id}`,
        data: {
            id: field.id,
            position: "top",
            type: "stepDropable"
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-stepper-${field.id}`,
        data: {
            id: field.id,
            position: "bottom",
            type: "stepDropable"
        }
    });

    return (
        <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <Card title="step 1" className={cn("shadow", {
                    "bg-gray-300": step.isOver
                })} ref={step.setNodeRef}>

                    {
                        sections?.length > 0 && sections.map((section: any) => (
                            <SectionDesigner section={section} />
                        ))
                    }

                </Card>
            </DragAreaSeperator>

        </div>
    )
}

export default StepperDesigner