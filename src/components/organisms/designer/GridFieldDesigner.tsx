import React from 'react';
import { fieldTypes } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@utils/cn';

interface GridFieldDesignerProps {
    id: string
    type: Pick<typeof fieldTypes, "GRID">
    children: React.ReactNode
    cols: number
}


const GridFieldDesigner: React.FC<GridFieldDesignerProps> = ({ id, type, children, cols }) => {

    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            id,
            type,
            parentId: id
        }
    });

    return (
        <div className="border border-gray-400 h-full p-2 flex-1 my-2 min-h-[50px] flex gap-2">
            <div ref={setNodeRef} className={cn(`p-5 w-full mt-4 grid grid-cols-2 gap-2`, {
                'bg-blue-200': isOver
            })} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {children}
            </div>
        </div>
    );

}
export default GridFieldDesigner;
