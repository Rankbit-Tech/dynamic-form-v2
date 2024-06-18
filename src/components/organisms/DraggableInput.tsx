import { useDraggable } from '@dnd-kit/core';
import INPUT_FIELDS from '@constants/inputFieldConstants';

import { nanoid } from 'nanoid';
import { IconType } from 'react-icons';

interface DraggableInputProps {
    type: string;
    label: string;
    icon: IconType;
}

const DraggableInput = ({ type, label, icon: Icon }: DraggableInputProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable(
        {
            id: `dragable-input-${type}`,
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
            className="p-2 border rounded bg-slate-700 shadow text-white flex flex-col items-center"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className='h-6 w-6  rounded-full bg-slate-500 grid place-items-center'>
                <Icon />
            </div>
            <span className='text-muted font-light text-sm !normal-case'>
                {label}
            </span>
        </div>

    );
};

export default DraggableInput;
