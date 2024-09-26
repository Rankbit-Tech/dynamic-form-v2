import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import React from 'react';

interface TextFieldDesigner {
    id: string
    label: string
    paragraph: string
    parentId: string
    fontSize: string
    textColor: string
    bold?: boolean;
    italic?: boolean
    underline?: boolean
}

const TextFieldDesigner: React.FC<TextFieldDesigner> = ({ label, id, paragraph, fontSize, parentId, textColor, bold, italic, underline }) => {
    const topHalf = useDroppable({
        id: `top-field-${id}`,
        data: {
            id: id,
            position: "top",
            parentId,
            type: VARIANT.FIELD
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-field-${id}`,
        data: {
            id: id,
            position: "bottom",
            parentId,
            type: VARIANT.FIELD
        }
    });

    const styles = {
        fontSize: `${fontSize}px`,
        color: textColor,
        ...(bold && { fontWeight: 'bold' }),
        ...(italic && { fontStyle: 'italic' }),
        ...(underline && { textDecoration: 'underline' }),
    }
    return (
        <div className=" border rounded bg-white shadow mt-1">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='mt-2 p-2'>
                    <label className='font-semibold'>{label}</label>
                    <div className="mt-1">
                        <p className=" p-1 rounded w-full" style={styles}>{paragraph}</p>
                    </div>
                </div>
            </DragAreaSeperator>
        </div>
    );
};

export default TextFieldDesigner;