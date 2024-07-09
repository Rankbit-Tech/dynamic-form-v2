
import { useFormStore } from "@store/useFormStore"
import { Button, Form, Steps } from "antd"
import { useForm } from "antd/es/form/Form"
import usePreview, { Step } from "@hooks/usePreview"
import { useEffect } from "react"

interface PreviewProps {
    data: Record<string, any>[]
}

interface Item {
    key: string
    title: string
    content: (step: Step, formValues: Record<string, any>) => void
}


const Preview = ({ data }: PreviewProps) => {
    const { setIsPreview, setFormValues } = useFormStore(state => state);

    const [form] = useForm();

    const { current, next, prev, items } = usePreview(form, data)

    const handleValueChange = (_: any, allValues: any) => {
        setFormValues(allValues)
    }

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