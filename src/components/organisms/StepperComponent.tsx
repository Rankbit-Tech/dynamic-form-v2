import React, { useState } from 'react';
import { Button, Steps, Form } from 'antd';
import INPUT_FIELDS from '@constants/inputFieldConstants'; // Adjust the import path
import SectionComponent from './SectionComponent';

const { Step } = Steps;

interface StepperProps {
    title: string;
    steps: Array<{ title: string; children: any[] }>;
}

const StepperComponent: React.FC<StepperProps> = ({ title, steps }) => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((step, index) => ({ key: index.toString(), title: step.title }));

    return (
        <div>
            <h3>{title}</h3>
            <Steps current={current} items={items} />
            <div style={{ marginTop: 16 }}>
                {steps[current].children.map(field => {
                    if (field.type === 'SECTION') {
                        return (
                            <SectionComponent key={field.id} title={field.title} children={field.children} />
                        );
                    }
                    const fieldConfig = INPUT_FIELDS[field.type];
                    const RenderComponent = fieldConfig?.renderComponent;
                    return RenderComponent ? (
                        <RenderComponent key={field.id} {...field} />
                    ) : null;
                })}
            </div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StepperComponent;
