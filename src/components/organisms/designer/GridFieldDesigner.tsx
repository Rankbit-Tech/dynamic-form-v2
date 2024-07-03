import React from 'react';
import { VARIANT, fieldTypes } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@utils/cn';
import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';

interface GridFieldDesignerProps {
    id: string
    type: Pick<typeof fieldTypes, "GRID">
    children: React.ReactNode
    cols: number
    parentId: string
}


const GridFieldDesigner: React.FC<GridFieldDesignerProps> = ({ id, type, children, cols, parentId }) => {

    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            id,
            type,
            parentId: id
        }
    });
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

    return (
        <div className="border rounded border-gray-400 h-full  flex-1 my-2 min-h-[50px] flex gap-2">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>

                <div className='mt-2 p-2'>
                    <div ref={setNodeRef} className={cn(`p-5 w-full mt-4 grid grid-cols-2 gap-2`, {
                        'bg-blue-200': isOver
                    })} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                        {children}
                    </div>
                </div>
            </DragAreaSeperator>
        </div>
    );

}
export default GridFieldDesigner;
