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
    const DesignerComponent = INPUT_FIELDS[draggedItem.type].designerComponent;

    return (
        <DragOverlay className='w-[500px]'>
            <DesignerComponent {...draggedItem} />
        </DragOverlay>
    );
};

export default DragOverlayContainer;
