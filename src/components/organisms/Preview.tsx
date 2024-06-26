
import { useFormStore } from "@store/useFormStore"
import { Button, Form, Steps } from "antd"
import { useState } from "react"
import INPUT_FIELDS from "@constants/inputFieldConstants"
import SectionComponent from "./SectionComponent"

interface PreviewProps {
    data: Record<string, any>[]
}


const renderStep = (steps: Record<string, any>[]) => {
    return steps.map(step => {
        const RenderComponent = INPUT_FIELDS[step.type]?.renderComponent;

        if (!RenderComponent) return null;

        if (step.type === 'SECTION') {
            return (
                <SectionComponent key={step.id} title={step.title} children={step.children} />
            );
        }

        return (
            <div key={step.id}>
                {step.children && step.children.length > 0
                    ? renderStep(step.children)
                    : <RenderComponent {...step} />}
            </div>
        );
    });
};

const Preview = ({ data }: PreviewProps) => {
    const { setIsPreview } = useFormStore(state => state);
    const [current, setCurrent] = useState(0);

    const items = data?.map((step, index) => ({
        key: index.toString(),
        title: step.title,
        content: renderStep(step.children)
    }));

    const [form] = Form.useForm();

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