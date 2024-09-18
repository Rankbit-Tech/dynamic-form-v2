
import { useFormStore } from "@store/useFormStore"
import { Button, Form, Steps } from "antd"
import { useForm } from "antd/es/form/Form"
import usePreview, { Step } from "@hooks/usePreview"
import useEventBus from "@hooks/useEventBus"

interface PreviewProps {
    data: Record<string, any>[]
    onSubmit?: (formData: FormData) => void
}

interface Item {
    key: string
    title: string
    content: (step: Step, formValues: Record<string, any>) => void
}


const Preview = ({ data, onSubmit }: PreviewProps) => {
    const { setIsPreview, setFormValues } = useFormStore(state => state);
    const { subscribe } = useEventBus()

    const [form] = useForm();

    const { current, next, prev, items } = usePreview(form, data)

    const handleValueChange = (_: any, allValues: any) => {
        setFormValues(allValues)
    }

    const handleFinish = (values: Record<string, any>) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]: any[]) => {
            if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, value);
            }
        });
        onSubmit?.(formData)
    }

    subscribe("sendAdharData", (data) => {
        form.setFieldsValue(data)
    })


    return (
        <div>
            <div className="w-full h-[50px] p-2 bg-slate-200 flex justify-end">
                <Button type="primary" onClick={() => setIsPreview(false)}>Builder</Button>
            </div>
            <div className="p-5 m-2">
                {data.length > 0 && (
                    <Form form={form} layout="vertical" onFinish={handleFinish} onValuesChange={handleValueChange}>
                        <Steps current={current}>
                            {items?.map((item: Item) => (
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