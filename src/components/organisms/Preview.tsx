
import { useFormStore } from "@store/useFormStore"
import { Button, Form, Steps } from "antd"
import { useState } from "react"
import INPUT_FIELDS from "@constants/inputFieldConstants"
import { fieldTypes } from "@constants/fieldTypes"
import { useForm, useWatch } from "antd/es/form/Form"

interface PreviewProps {
    data: Record<string, any>[]
}

interface Rule {
    field: string
    operator: string
    value: string
    source: string
}

interface Conditions {
    combinator: string
    rules: Rule[]
}

const evaluateConditions = (conditions: Conditions, formValues: Record<string, any>) => {
    const { combinator, rules } = conditions;

    const evaluateRule = (rule: Rule) => {
        const fieldValue = formValues?.[rule.field] ?? '';
        switch (rule.operator) {
            case 'isEmpty':
                return !fieldValue;
            case 'isNotEmpty':
                return !!fieldValue;
            case 'equals':
                return fieldValue === rule.value;
            case 'notEquals':
                return fieldValue !== rule.value;
            default:
                return true;
        }
    };

    if (rules.length === 0) {
        return { hide: false, disable: false }; // No conditions, do not hide or disable by default
    }


    let shouldHide = false;
    let shouldDisable = false;

    if (combinator === 'and') {
        shouldHide = rules.every(evaluateRule);
        shouldDisable = rules.every(evaluateRule);
    } else if (combinator === 'or') {
        shouldHide = rules.some(evaluateRule);
        shouldDisable = rules.some(evaluateRule);
    }

    return {
        hide: shouldHide,
        disable: shouldDisable,
    };
};


const renderStep = (steps: Record<string, any>[], formValues: any) => {
    return steps.map(step => {
        const RenderComponent = INPUT_FIELDS[step.type]?.renderComponent;

        if (!RenderComponent) return null;

        let shouldHide = false;
        let isDisabled = false;

        if (step.conditions && step.conditions.rules.length > 0) {
            const { hide, disable } = evaluateConditions(step.conditions, formValues);
            shouldHide = hide && step.conditions.rules.some((rule: Rule) => rule.value === 'hide');
            isDisabled = disable && step.conditions.rules.some((rule: Rule) => rule.value === 'disable');
        }

        if (shouldHide) {
            return null;
        }

        if (step.type === fieldTypes.SECTION) {
            return (
                <RenderComponent key={step.id} {...step} />
            );
        }
        if (step.type === fieldTypes.GRID) {
            return (
                <RenderComponent key={step.id} {...step} />
            );
        }

        return (
            <div key={step.id}>
                {step.children && step.children.length > 0
                    ? renderStep(step.children, formValues)
                    : <RenderComponent {...step} disabled={isDisabled} />}
            </div>
        );
    });
};




const Preview = ({ data }: PreviewProps) => {
    const { setIsPreview } = useFormStore(state => state);
    const [current, setCurrent] = useState(0);

    const [form] = useForm();
    const formValues = useWatch([], form) || {}

    const items = data?.map((step, index) => ({
        key: index.toString(),
        title: step.title,
        content: renderStep(step.children, formValues)
    }));

    const next = () => {
        form.validateFields().then(() => {
            setCurrent(current + 1);
        })
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleFinish = (values: Record<string, any>) => {
        console.log({ values })
    }

    return (
        <div>
            <div className="w-full h-[50px] p-2 bg-slate-200 flex justify-end">
                <Button type="primary" onClick={() => setIsPreview(false)}>Builder</Button>
            </div>
            <div className="p-5 m-2 bg-gray-100">
                {data.length > 0 && (
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Steps current={current}>
                            {items?.map(item => (
                                <Steps.Step key={item.key} title={item.title} />
                            ))}
                        </Steps>
                        <div className="mt-4">
                            {items[current].content}
                        </div>
                        <div className="mt-6">
                            {current < items.length - 1 && (
                                <Button type="primary" onClick={next}>
                                    Next
                                </Button>
                            )}
                            {current === items.length - 1 && (
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            )}
                            {current > 0 && (
                                <Button className="mx-2" onClick={prev}>
                                    Previous
                                </Button>
                            )}
                        </div>
                    </Form>
                )}

                {data.length == 0 && (<h1 className="text-center font-semibold text-slate-600">No fields found</h1>)}
            </div>
        </div>
    )
}

export default Preview