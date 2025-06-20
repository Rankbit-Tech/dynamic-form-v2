import React from 'react';
import { Checkbox, } from 'antd';
import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';

interface SameAsAboveProps {
    id: string;
    parentId: string;
    label: string
}

const SameAsAboveDesigner: React.FC<SameAsAboveProps> = ({ id, parentId, label }) => {
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

    return (
        <div className="relative border rounded bg-white shadow mt-1">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='p-1'>
                    <div className='flex items-center gap-2 mt-5'>
                        <Checkbox>{label}</Checkbox>
                    </div>

                </div>
            </DragAreaSeperator>
        </div>
    );
}

export default SameAsAboveDesigner;
