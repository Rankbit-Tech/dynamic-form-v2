import React from 'react';
import { Card, Form } from 'antd';
import INPUT_FIELDS from '@constants/inputFieldConstants';

interface SectionProps {
    title: string;
    children: any[];
}

const SectionComponent: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <Card title={title} bordered={false}>
            {children.map(field => {
                const fieldConfig = INPUT_FIELDS[field.type];
                const RenderComponent = fieldConfig?.renderComponent;
                return RenderComponent ? (
                    <RenderComponent key={field.id} {...field} />
                ) : null;
            })}
        </Card>
    );
};

export default SectionComponent;
