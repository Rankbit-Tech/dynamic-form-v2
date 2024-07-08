import DragAreaSeperator from '@components/atoms/DragAreaSeperator'
import DragAreaSplitter from '@components/atoms/DragAreaSplitter'
import { VARIANT } from '@constants/fieldTypes'
import { useDroppable } from '@dnd-kit/core'
import { Button, Input } from 'antd'

interface AadharCardDesignerProps {
    id: string
    parentId: string
}

const AadharCardDesigner = ({ id, parentId }: AadharCardDesignerProps) => {

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
                <div className='p-2 w-1/3'>
                    <div className='flex items-center gap-2 mt-5 justify-center'>
                        <Input placeholder="Enter Aadhar Number" />
                        <Button type='primary'>Send OTP</Button>
                    </div>
                    <div className='flex items-center gap-2 mt-5'>
                        <Input placeholder='Enter OTP' />
                        <Button type='primary'>Verify OTP</Button>
                    </div>
                </div>
            </DragAreaSeperator>
        </div>
    )
}

export default AadharCardDesigner