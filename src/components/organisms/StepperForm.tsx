import React from 'react';
import { Steps, Button } from 'antd';
import useFormStore from '@hooks/useFormBuilder';

const { Step } = Steps;

const StepperForm: React.FC = () => {
    const { sections } = useFormStore();
    const [current, setCurrent] = React.useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    return (
        <div>
            <Steps current={current}>
                {sections.map((section) => (
                    <Step key={section.id} title={section.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {sections[current]?.fields.map((field) => (
                    <div key={field.id}>{/* Render field based on type */}</div>
                ))}
            </div>
            <div className="steps-action">
                {current < sections.length - 1 && (
                    <Button type="primary" onClick={next}>
                        Next
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prev}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StepperForm;
