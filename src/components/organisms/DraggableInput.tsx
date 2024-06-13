import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { LucideIcon } from 'lucide-react';
import DragOverlay from '@components/molecules/DragOverlay';

interface DraggableInputProps {
    id: string;
    type: string;
    label: string;
    icon: LucideIcon;
}

const DraggableInput: React.FC<DraggableInputProps> = ({ id, type, label, icon: Icon }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable(
        {
            id,
            data: {
                ...INPUT_FIELDS[type].construct()
            }
        }
    );

    return (
        <>
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                className="p-2 border rounded bg-white shadow"
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <Icon />
                {label}
            </div>
        </>
    );
};

export default DraggableInput;
