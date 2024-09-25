import React from 'react';
import { Collapse, CollapseProps } from 'antd';


interface SectionProps {
    id: string
    title: string;
    childrenComponent: any[];
    isCollapsable: boolean
}

const SectionComponent: React.FC<SectionProps> = ({ id, title, childrenComponent, isCollapsable }) => {

    const items: CollapseProps['items'] = [
        {
            key: id,
            label: title,
            children: childrenComponent
        },

    ];
    return (

        <Collapse className="shadow mb-2" defaultActiveKey={id}  {... !isCollapsable && { activeKey: id }} items={items} />
    );
};

export default SectionComponent;
