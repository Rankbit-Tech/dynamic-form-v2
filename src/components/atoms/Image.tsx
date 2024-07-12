import { Form, Image as ImagePreview, Input } from "antd"

interface ImageProps {
    label: string
    src: string
    width: number
    height: number
    name: string
}

const Image = ({ label, src, name, width, height }: ImageProps) => {
    return (
        <Form.Item name={name} label={label}>
            <input type="image" height={`${height}px`} width={`${width}px`} src={src} alt="" />
        </Form.Item>
    )
}

export default Image