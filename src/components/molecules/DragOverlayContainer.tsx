import React, { useState } from 'react';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import INPUT_FIELDS, { InputFieldConfig } from '@constants/inputFieldConstants';

const DragOverlayContainer: React.FC = () => {
    const [draggedItem, setDraggedItem] = useState<InputFieldConfig | null>(null);

    useDndMonitor({
        onDragStart: (event: any) => {
            setDraggedItem(event.active.data.current);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;
    const Icon = INPUT_FIELDS[draggedItem.type].icon

    return (
        <DragOverlay>
            <div className='h-full w-full bg-slate-500 rounded-md flex justify-center items-center'>
                <div className='h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center'>
                    {Icon && (<Icon className='h-6 w-6' />)}
                </div>
            </div>
        </DragOverlay>
    );
};

export default DragOverlayContainer;
