import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useFormStore } from '@store/useFormStore';
import FormSection from './FormSection';
import { cn } from '@utils/cn';

const DroppableZone: React.FC = () => {
    const { sections } = useFormStore();
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',

    });

    return (
        <div ref={setNodeRef} className={cn("flex flex-col min-h-full border-dashed border-2 border-gray-300 p-2 py-4 bg-gray-100", {
            'bg-gray-200': isOver && sections?.length
        })}>
            {isOver && !sections?.length && <div className='bg-gray-300 w-full p-5 rounded' />}

            {
                sections?.length == 0 && (<div className='w-full font-semibold text-gray-500 text-center flex-grow h-full flex items-center'>
                    <h1 className='w-full font-semibold text-gray-500 text-center flex-grow'>Drag items here</h1>
                </div>)
            }

            <div className='flex flex-col gap-5 relative'>
                {sections?.length > 0 && sections.map((section: any) => (
                    <>
                        <FormSection key={section.id} field={section} />
                    </>
                ))}
            </div>
        </div>
    );
};

export default DroppableZone;
