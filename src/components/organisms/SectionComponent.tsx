import React from 'react';
import { Card, Collapse, CollapseProps, Form } from 'antd';
import INPUT_FIELDS from '@constants/inputFieldConstants';

interface SectionProps {
    id: string
    title: string;
    children: any[];
    isCollapsable: boolean
}

const SectionComponent: React.FC<SectionProps> = ({ id, title, children, isCollapsable }) => {

    const items: CollapseProps['items'] = [
        {
            key: id,
            label: title,
            children: children.map(field => {
                const fieldConfig = INPUT_FIELDS[field.type];
                const RenderComponent = fieldConfig?.renderComponent;
                return RenderComponent ? (
                    <RenderComponent key={field.id} {...field} />
                ) : null;
            })
        },

    ];
    return (

        <Collapse className="shadow" defaultActiveKey={id}  {... !isCollapsable && { activeKey: id }} items={items} />
    );
};

export default SectionComponent;
