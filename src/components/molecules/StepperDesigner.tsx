import { useDroppable } from "@dnd-kit/core"
import { cn } from "@utils/cn";
import { Card } from "antd"

const StepperDesigner = ({ field }: any) => {

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
        <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md">
            <div ref={topHalf.setNodeRef} className="absolute w-full top-0 h-[50px] rounded-t-md" />
            <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-[50px] rounded-b-md" />

            {topHalf.isOver && <div className="absolute top-0 w-full z-10 rounded-md h-[7px] bg-gray-700 rounded-b-none" />}
            <Card title="step 1" className="shadow">

            </Card>
            {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-gray-700 rounded-t-none" />}

        </div>
    )
}

export default StepperDesigner