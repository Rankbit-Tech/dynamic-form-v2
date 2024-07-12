import { VARIANT } from "@constants/fieldTypes"
import { useFormStore } from "@store/useFormStore"
import { Table } from "antd";
import { useEffect } from "react";



interface Field {
    label: string;
    value: string;
}

interface Step {
    title: string;
    fields: Field[];
}

const Summary = () => {

    const { getSummary, setFormValues } = useFormStore(state => state)



    const columns = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];
    const summary: Step[] = getSummary();
    return (
        <div className="border p-2 bg-white shadow" >
            <div>
                {summary.map((step, index) => (
                    <div key={index} style={{ marginBottom: 24 }}>
                        <h2 className="text-red-900 font-semibold mb-4 w-full">{step.title}</h2>
                        <div className="w-full">
                            {step.fields.map(field => {
                                return (
                                    <div className="flex">
                                        <span className="min-w-[250px] font-bold">{field.label}</span>
                                        <span> : &nbsp;{field.value}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Summary