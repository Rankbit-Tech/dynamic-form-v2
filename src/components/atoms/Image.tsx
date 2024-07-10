import { Image as ImagePreview } from "antd"

interface ImageProps {
    label: string
    src: string
    width: number
    height: number
}

const Image = ({ label, src, width, height }: ImageProps) => {
    return (
        // <div className="flex flex-col gap-y-2">
        //     <label>{label}</label>
        <ImagePreview
            width={width}
            height={height}
            src={src}
        />
        // </div>
    )
}

export default Image