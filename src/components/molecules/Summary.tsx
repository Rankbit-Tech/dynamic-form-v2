import { useFormStore } from "@store/useFormStore"
import { fieldTypes } from "@constants/fieldTypes";
import { Image as ImagePreview } from "antd"
import { useCallback } from "react"
import dayjs from "dayjs";
interface summaryProps {
    validations?: {
        fields?: string[]
    }
}

const Summary = ({ validations }: summaryProps) => {

    const { getSummary } = useFormStore(state => state)

    const fieldsToIncludeSet = new Set(validations?.fields || []);

    const summary: Step[] = getSummary();

    const renderFields = useCallback((field: Field) => {
        switch (field.type) {
            case fieldTypes.IMAGE:
                return <ImagePreview
                    height={60}
                    src={field.value}
                />
            case fieldTypes.FILEUPLOAD:
                const name = field?.name || "File Upload"
                return <span> : &nbsp;{name}</span>;
            case fieldTypes.DATETIME:
                return dayjs.isDayjs(field.value) ? (<span> : &nbsp; {dayjs(field.value).format("DD/MM/YYYY").toString()} </span>) : <span> : &nbsp;{field.value}</span>
            default:
                return <span> : &nbsp;{field.value}</span>
        }
    }, [])

    return (
        <div className="border p-2 bg-white shadow" >
            <div>
                {summary.map((step, index) => (
                    <div key={index} style={{ marginBottom: 24 }}>
                        <h2 className="text-red-900 font-semibold mb-4 w-full">{step.title}</h2>
                        <div className="w-full columns-2">
                            {step.fields.map(field => {
                                if (!fieldsToIncludeSet.has(field.name)) {
                                    return null;
                                }
                                return (
                                    <div className="flex" key={field.label}>
                                        <span className="min-w-[250px] font-bold">{field.label}</span>
                                        {renderFields(field)}
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