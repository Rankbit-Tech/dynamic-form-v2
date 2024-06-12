import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useFormStore } from '@store/useFormStore';
import FormSection from './FormSection';

const DroppableZone: React.FC = () => {
    const { sections } = useFormStore();
    const { isOver, setNodeRef } = useDroppable({ id: 'droppable' });


    return (
        <div ref={setNodeRef} className="flex flex-col h-full border-dashed border-2 border-gray-300 p-2 bg-white">
            {isOver && <div className='bg-gray-300 w-full p-5 rounded' />}

            <div className='w-full font-semibold text-gray-500 text-center flex-grow h-full flex items-center'>
                <h1 className='w-full font-semibold text-gray-500 text-center flex-grow'>Drag items here</h1>
            </div>
            {sections.map((section) => (
                <FormSection key={section.id} sectionId={section.id} />
            ))}
        </div>
    );
};

export default DroppableZone;
