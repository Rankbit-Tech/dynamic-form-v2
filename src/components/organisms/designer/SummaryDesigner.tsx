import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { VARIANT } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core";


interface SummarySettingsProps {
    id: string
    parentId: string
}


const SummaryDesigner = ({ id, parentId }: SummarySettingsProps) => {
    const topHalf = useDroppable({
        id: `top-field-${id}`,
        data: {
            id: id,
            position: "top",
            parentId,
            type: VARIANT.SUMMARY
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-field-${id}`,
        data: {
            id: id,
            position: "bottom",
            parentId,
            type: VARIANT.SUMMARY
        }
    });
    return (
        <div className="relative my-1 border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='p-2'>
                    <h2>Summary</h2>
                </div>
            </DragAreaSeperator>
        </div>
    )
}

export default SummaryDesigner