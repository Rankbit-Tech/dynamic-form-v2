import { useDroppable } from "@dnd-kit/core"
import { cn } from "@utils/cn";
import { Card } from "antd"

const StepperDesigner = ({ field }: any) => {
    console.log(field)
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
            tyle: "stepDropable"
        }
    });


    return (
        <>
            <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset">
                <div ref={topHalf.setNodeRef} className={cn("absolute w-full h-1/2 rounded-t-md -top-[10px]", {
                    "bg-gray-500": topHalf.isOver
                })} />
                <div ref={bottomHalf.setNodeRef} className={cn("absolute w-full -bottom-[10px] h-1/2 rounded-b-md", {
                    "bg-gray-500": bottomHalf.isOver

                })} />
                <Card title="step 1" className="shadow">

                </Card>
            </div>
        </>
    )
}

export default StepperDesigner