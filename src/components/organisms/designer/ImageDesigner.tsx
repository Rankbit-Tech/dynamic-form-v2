import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { useDroppable } from '@dnd-kit/core';


interface ImageDesignerProps {
    label: string
    id: string
    parentId: string
    type: string
}

const ImageDesigner = ({ label, id, parentId, type }: ImageDesignerProps) => {

    const topHalf = useDroppable({
        id: `top-field-${id}`,
        data: {
            id: id,
            position: "top",
            parentId,
            type: VARIANT.FIELD
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-field-${id}`,
        data: {
            id: id,
            position: "bottom",
            parentId,
            type: VARIANT.FIELD
        }
    });
    const Icon = INPUT_FIELDS[type].icon;
    return (
        <div className="relative my-1 border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='p-2 m-1'>
                    <label>{label}</label>
                    {<Icon size={40} className='mt-2' />}
                </div>
            </DragAreaSeperator>
        </div>
    )
}

export default ImageDesigner