import DragAreaSeperator from '@components/atoms/DragAreaSeperator'
import DragAreaSplitter from '@components/atoms/DragAreaSplitter'
import { fieldTypes } from '@constants/fieldTypes'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@utils/cn'
import { Card } from 'antd'
import { ReactNode } from 'react'

interface SectionProps {
    id: string
    type: string
    isCollapsable: boolean
    children: ReactNode
    parentId: string
}

const SectionDesigner = ({ id, type,
    isCollapsable, parentId, children }: SectionProps) => {

    const sectionRef = useDroppable({
        id: `section-drag-${id}`,
        data: {
            id: id,
            type: type
        }
    })

    const topHalf = useDroppable({
        id: `top-section-${id}`,
        data: {
            id: parentId,
            position: "top",
            type: type
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-section-${id}`,
        data: {
            id: parentId,
            position: "bottom",
            type: type
        }
    });

    return (
        <div className="relative my-1">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <Card title="section" className={cn("shadow", {
                    "bg-gray-300": sectionRef.isOver
                })} ref={sectionRef.setNodeRef}>
                    {children}
                </Card>
            </DragAreaSeperator>
        </div>

    )
}

export default SectionDesigner