import React, { useState, useEffect } from 'react';
import { useDndMonitor } from '@dnd-kit/core';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const DragOverlay: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggingType, setDraggingType] = useState<string | null>(null);

    useDndMonitor({
        onDragStart(event: Record<string, any>) {
            setActiveId(event.active.id);
            const draggingItem = INPUT_FIELDS[event.active.id];
            console.log(draggingItem)
            if (draggingItem) {
                setDraggingType(draggingItem.type);
            }
        },
        onDragEnd() {
            setActiveId(null);
            setDraggingType(null);
        },
        onDragCancel() {
            setActiveId(null);
            setDraggingType(null);
        },
    });

    if (!activeId || !draggingType) return null;

    const DesignerComponent = INPUT_FIELDS[draggingType].designerComponent;

    return (
        <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}>
            <DesignerComponent label={activeId} />
        </div>
    );
};

export default DragOverlay;
