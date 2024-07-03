import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import { InputNumber } from 'antd';
import React from 'react';

interface NumberFieldDesigner {
    id: string
    label: string

    parentId: string

    placeholder: string
}

const NumberFieldDesigner: React.FC<NumberFieldDesigner> = ({ label, placeholder, id, parentId }) => {

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
        <div className=" border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>

                <div className='mt-2 p-2'>
                    <div className="mt-5">
                        <label>{label}</label>
                        <InputNumber placeholder={placeholder} className="border p-1 rounded w-full" />
                    </div>
                </div>
            </DragAreaSeperator>
        </div>
    );
};

export default NumberFieldDesigner;
