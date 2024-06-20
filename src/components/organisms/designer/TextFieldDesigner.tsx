import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { fieldTypes } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import React, { Children, ReactNode } from 'react';

interface TextFieldDesignerProps {
    id: string
    label: string
    placeholder: string
    name: string
    children: ReactNode
}

const TextFieldDesigner = ({ id, label, placeholder, name, children }: TextFieldDesignerProps) => {

    const topHalf = useDroppable({
        id: `top-field-${id}`,
        data: {
            id: id,
            position: "top",
            type: fieldTypes.TEXT
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-stepper-${id}`,
        data: {
            id: id,
            position: "bottom",
            type: fieldTypes.TEXT
        }
    });

    return (
        <div className="relative p-2 my-1 border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                {children}
                {/* <label>{label}</label>
                <input readOnly disabled placeholder={placeholder} type="text" className="mt-1 p-2 border rounded w-full" /> */}
            </DragAreaSeperator>
        </div>
    );
};

export default TextFieldDesigner;
