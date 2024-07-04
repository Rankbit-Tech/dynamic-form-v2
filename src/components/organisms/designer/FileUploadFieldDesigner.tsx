import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DragAreaSeperator from '@components/atoms/DragAreaSeperator';
import DragAreaSplitter from '@components/atoms/DragAreaSplitter';
import { VARIANT } from '@constants/fieldTypes';


interface FileUploadFieldDesigner {
    id: string
    label: string

    parentId: string

}

const FileUploadFieldDesigner: React.FC<FileUploadFieldDesigner> = ({ label, id, parentId }) => {

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
        <div className=" border rounded bg-white shadow mt-1">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>

                <div className='mt-2 p-2'>
                    <label>{label}</label>
                    <div className="mt-1">
                        <Upload >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </div>
                </div>
            </DragAreaSeperator>
        </div>
    );
};

export default FileUploadFieldDesigner;
