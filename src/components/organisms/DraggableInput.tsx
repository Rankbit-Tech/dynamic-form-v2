import { useDraggable } from '@dnd-kit/core';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { LucideIcon } from 'lucide-react';
import { nanoid } from 'nanoid';

interface DraggableInputProps {
    type: string;
    label: string;
    icon: LucideIcon;
}

const DraggableInput = ({ type, label, icon: Icon }: DraggableInputProps) => {

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable(
        {
            id: "Stepper",
            data: {
                id: nanoid(),
                ...INPUT_FIELDS[type].construct()
            }
        }
    );

    return (

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

    );
};

export default DraggableInput;
