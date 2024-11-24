import { useFormStore } from "@store/useFormStore"

import { Image as ImagePreview } from "antd"


interface summaryProps {
    validations?: {
        fields?: string[]
    }
}
const Summary = ({ validations }: summaryProps) => {

    const { getSummary } = useFormStore(state => state)

    const fieldsToIncludeSet = new Set(validations?.fields || []);

    const summary: Step[] = getSummary();
    return (
        <div className="border p-2 bg-white shadow" >
            <div>
                {summary.map((step, index) => (
                    <div key={index} style={{ marginBottom: 24 }}>
                        <h2 className="text-red-900 font-semibold mb-4 w-full">{step.title}</h2>
                        <div className="w-full">
                            {step.fields.map(field => {
                                if (!fieldsToIncludeSet.has(field.name)) {
                                    return null;
                                }
                                return (
                                    <div className="flex" key={field.label}>
                                        <span className="min-w-[250px] font-bold">{field.label}</span>
                                        {field?.type == "IMAGE" ? (
                                            <ImagePreview
                                                height={60}
                                                src={field.value}
                                            />
                                        ) : (<span> : &nbsp;{field.value}</span>)}
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Summary