import { useState } from 'react'
import { FormInstance, useWatch } from 'antd/es/form/Form';
import { Rule, evaluateConditions } from "@lib/condition"
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { fieldTypes } from '@constants/fieldTypes';
import { useFormStore } from '@store/useFormStore';

export type Step = {
    title: string
    children: Record<string, any>[]
}

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
            const children = renderStep(step.children, formValues);
            return (
                <RenderComponent childrenComponent={children} key={step.id} {...step} />
            );
        }
        if (step.type === fieldTypes.GRID) {
            const children = renderStep(step.children, formValues);

            return (
                <RenderComponent childrenComponent={children} key={step.id} {...step} />
            );
        }

        return (
            <div key={step.id}>
                {step.children && step.children.length > 0
                    ? renderStep(step.children, formValues)
                    : <RenderComponent key={step.id} {...step} disabled={isDisabled} />}
            </div>
        );
    });
};



const usePreview = (form: FormInstance, data: Record<string, any>) => {

    const [current, setCurrent] = useState(0);
    const formValues = useWatch([], form) || {}

    const items = data?.map((step: Step, index: number) => ({
        key: index.toString(),
        title: step.title,
        content: renderStep(step.children, formValues)
    }));

    const saveAsAboveOptions = useFormStore(state => {
        return state.fields.find(field => field.type == fieldTypes.SAMEASABOVE)?.options
    })

    saveAsAboveOptions.map(({ label, value }: { label: string, value: string }) => {
        if (form.getFieldValue("sameAsAbove")) {
            const originalValue = form.getFieldValue(label);
            form.setFieldValue(value, originalValue)
        } else {
            form.setFieldValue(value, '')

        }
    })


    const next = () => {
        form.validateFields().then(() => {
            setCurrent(current + 1);
        })
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    return {
        current,
        next,
        prev,
        items
    }
}

export default usePreview