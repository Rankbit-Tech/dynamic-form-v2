import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT, fieldTypes } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import { Select } from 'antd';
import React from 'react';


interface SelectFieldDesignerProps {
    id: string
    label: string
    parentId: string
    options: {
        label: string
        value: string | number
    }[]
    defaultValue: SelectFieldDesignerProps['options'][number]['value'];
}

const SelectFieldDesigner: React.FC<SelectFieldDesignerProps> = ({ id, label, parentId, options, defaultValue }) => {

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
        <div className="relative border rounded bg-white shadow my-2">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='mt-2 p-2'>
                    <label htmlFor="">{label || "Label"}</label>
                    <Select
                        defaultValue={defaultValue}
                        className='w-full'
                        disabled
                        options={options}
                    />
                </div>
            </DragAreaSeperator>
        </div>
    );
};

export default SelectFieldDesigner;
