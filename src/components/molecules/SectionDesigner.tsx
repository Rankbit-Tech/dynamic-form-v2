import DragAreaSeperator from '@components/atoms/DragAreaSeperator'
import DragAreaSplitter from '@components/atoms/DragAreaSplitter'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@utils/cn'
import { Card } from 'antd'

interface SectionProps {
    section: Record<string, any>
}

const SectionDesigner = ({ section }: SectionProps) => {

    const sectionRef = useDroppable({
        id: `section-drag-${section.id}`,
        data: {
            id: section.id,
            type: section.type

        }
    })

    const topHalf = useDroppable({
        id: `top-section-${section.id}`,
        data: {
            id: section.id,
            position: "top",
            type: section.type
        }

    });
    const bottomHalf = useDroppable({
        id: `bottom-section-${section.id}`,
        data: {
            id: section.id,
            position: "bottom",
            type: section.type
        }
    });

    return (
        <div className="relative">
            <DragAreaSplitter topRef={topHalf.setNodeRef} bottomRef={bottomHalf.setNodeRef} />
            <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
                <Card title="section" className={cn("shadow", {
                    "bg-gray-300": sectionRef.isOver
                })} ref={sectionRef.setNodeRef}>
                    <div>
                        {JSON.stringify(section)}
                    </div>
                </Card>
            </DragAreaSeperator>
        </div>

    )
}

export default SectionDesigner