import React from 'react';
import { Card, Collapse, CollapseProps, Form } from 'antd';
import INPUT_FIELDS from '@constants/inputFieldConstants';

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

        <Collapse className="shadow" defaultActiveKey={id}  {... !isCollapsable && { activeKey: id }} items={items} />
    );
};

export default SectionComponent;
