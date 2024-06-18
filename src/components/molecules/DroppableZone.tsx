import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useFormStore } from '@store/useFormStore';
import { cn } from '@utils/cn';
import { fieldTypes } from '@constants/fieldTypes';
import RecursiveComponent from './RecursiveComponent';
import { transformData } from '@utils/transform';

const DroppableZone: React.FC = () => {
    const { steps, sections, fields } = useFormStore(state => state);

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
        data: {
            type: fieldTypes.CANVAS
        }

    });
    const data = transformData(steps, sections, fields)

    return (
        <div ref={setNodeRef} className={cn("flex flex-col min-h-full border-dashed border-2 border-gray-300 p-2 py-4 bg-gray-100", {
            'bg-gray-200': isOver && data?.length
        })}>
            {isOver && !data?.length && <div className='bg-gray-300 w-full p-5 rounded' />}

            {
                data?.length == 0 && (<div className='w-full font-semibold text-gray-500 text-center flex-grow h-full flex items-center'>
                    <h1 className='w-full font-semibold text-gray-500 text-center flex-grow'>Drag items here</h1>
                </div>)
            }

            <div className='flex flex-col gap-2'>
                {data?.length > 0 && data.map(item => (
                    <RecursiveComponent key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default DroppableZone;
