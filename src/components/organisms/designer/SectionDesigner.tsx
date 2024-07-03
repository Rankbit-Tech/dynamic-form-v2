import DragAreaSeperator from '@components/atoms/DragAreaSeperator'
import DragAreaSplitter from '@components/atoms/DragAreaSplitter'
import { VARIANT } from '@constants/fieldTypes';
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@utils/cn'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { ReactNode } from 'react'

interface SectionProps {
    id: string
    type: string
    isCollapsable: boolean
    children: ReactNode
    parentId: string
    title: string
}

const SectionDesigner = ({ id, title, type,
    isCollapsable, parentId, children }: SectionProps) => {
    const sectionRef = useDroppable({
        id: `section-drag-${id}`,
        data: {
            id: id,
            type: VARIANT.SECTION
        }
    })

    const topHalf = useDroppable({
        id: `top-section-${id}`,
        data: {
            id: id,
            parentId,
            position: "top",
            type: VARIANT.SECTION
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-section-${id}`,
        data: {
            id: id,
            parentId,
            position: "bottom",
            type: VARIANT.SECTION
        }
    });

    const items: CollapseProps['items'] = [
        {
            key: id,
            label: title,
            children,
        },

    ];

    return (
        <div className="relative my-1">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <Collapse defaultActiveKey={id} {... !isCollapsable && { activeKey: id }} className={cn("shadow", {
                    "bg-gray-300": sectionRef.isOver
                })} ref={sectionRef.setNodeRef} items={items} />

            </DragAreaSeperator>
        </div>

    )
}

export default SectionDesigner