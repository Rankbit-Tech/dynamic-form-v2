import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';

import { Radio } from 'antd';
import React from 'react';

interface RadioButtonFieldDesigner {
    id: string
    label: string
    direction: "horizontal" | "vertical" | undefined
    parentId: string
    options: Array<{ label: string, value: string }>,
    optionType: 'default' | 'button'
    buttonStyle: 'solid' | 'outline'
}

const RadioButtonFieldDesigner: React.FC<RadioButtonFieldDesigner> = ({ id, optionType, buttonStyle, parentId, label, options }) => {

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
        <div className="py-2 mt-1 border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>

                <div className='mt-2 p-2 flex flex-col'>
                    <label className='font-semibold mr-2 mb-2'>{label}</label>
                    {options?.length > 0 ? (
                        <Radio.Group
                            optionType={optionType}
                            buttonStyle={buttonStyle}
                            options={options} />) : <h2 className='font-semibold text-slate-600 text-center'>Radio Field</h2>}
                </div>
            </DragAreaSeperator>

        </div>
    );
};

export default RadioButtonFieldDesigner;
