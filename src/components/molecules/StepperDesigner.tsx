import { fieldTypes } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core"
import { useFormStore } from "@store/useFormStore";
import { cn } from "@utils/cn";
import { Card } from "antd"
import SectionDesigner from "./SectionDesigner";

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
    console.log({ sections })


    return (
        <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md">
            <div ref={topHalf.setNodeRef} className="absolute w-full top-0 h-[10px] rounded-t-md" />
            <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-[10px] rounded-b-md" />

            {topHalf.isOver && <div className="absolute top-0 w-full z-10 rounded-md h-[7px] bg-gray-700 rounded-b-none" />}
            <Card title="step 1" className={cn("shadow", {
                "bg-gray-300": step.isOver
            })} ref={step.setNodeRef}>

                {
                    sections?.length > 0 && sections.map((section: any) => (
                        <SectionDesigner section={section} />
                    )
                    )
                }

            </Card>
            {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-gray-700 rounded-t-none" />}

        </div>
    )
}

export default StepperDesigner