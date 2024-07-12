import useEventBus from "@hooks/useEventBus"
import { Image as ImagePreview } from "antd"
import { useState } from "react"

interface ImageProps {
    label: string
    src: string
    width: number
    height: number
}

const Image = ({ label, src, width, height }: ImageProps) => {
    const [source, setSource] = useState(src)
    const { subscribe } = useEventBus()
    subscribe("sendAadharProfile", (data) => {
        setSource(data)
    })
    return (
        <div className="flex flex-col gap-y-2 my-2">
            <label>{label}</label>
            <ImagePreview
                width={width}
                height={height}
                src={source}
            />
        </div>
    )
}

export default Image