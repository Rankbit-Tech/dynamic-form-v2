import { fieldTypes } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@utils/cn";
import { Card } from "antd"
import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { ReactNode } from "react";

interface StepperDesignerProps {
    id: string
    children: ReactNode
}


const StepperDesigner = ({ id, children }: StepperDesignerProps) => {


    const step = useDroppable({
        id: `step-drop-${id}`,
        data: {
            id: id,
            type: fieldTypes.STEPPER
        }

    });
    const topHalf = useDroppable({
        id: `top-stepper-${id}`,
        data: {
            id: id,
            position: "top",
            type: fieldTypes.STEPPER
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-stepper-${id}`,
        data: {
            id: id,
            position: "bottom",
            type: fieldTypes.STEPPER
        }
    });

    return (
        <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <Card title="step 1" className={cn("shadow", {
                    "bg-gray-300": step.isOver
                })} ref={step.setNodeRef}>
                    {children}
                </Card>
            </DragAreaSeperator>

        </div>
    )
}

export default StepperDesigner