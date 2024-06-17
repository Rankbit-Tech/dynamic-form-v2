import { Card } from 'antd'

interface SectionProps {
    section: Record<string, any>
}

const SectionDesigner = ({ section }: SectionProps) => {

    // const getSections = (sections: Record<string, any>, stepId: string) => {
    //     const filteredSection = sections
    //         .filter((section: Record<string, any>) => section.stepId === stepId)
    //     // .map((section: Record<string, any>) => ({
    //     //     ...section,
    //     //     children: getSections(sections, section.stepId)
    //     // }));

    //     console.log({ filteredSection })
    // };
    // return getSections(state.sections, field.id);
    return (
        <Card title="section" className='my-2 shadow'>
            <div>
                {section.id}
            </div>
        </Card>
    )
}

export default SectionDesigner