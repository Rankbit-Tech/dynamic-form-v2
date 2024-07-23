import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';

import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core';
import { Input } from 'antd';

interface TextFieldDesignerProps {
    id: string
    label: string
    placeholder: string
    name: string
    parentId: string
}

const InputFieldDesigner = ({ id, parentId, label, placeholder }: TextFieldDesignerProps) => {

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
        <div className="relative my-1 border rounded bg-white shadow">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <div className='p-2'>
                    <label>{label}</label>
                    <Input readOnly disabled placeholder={placeholder} type="text" className="mt-1 p-2 border rounded w-full" />
                </div>
            </DragAreaSeperator>
        </div>
    );
};

export default InputFieldDesigner;
