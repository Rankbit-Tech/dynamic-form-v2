import { Form, Radio, Space } from 'antd'

interface RadioInputProps {
    name: string
    label: string
    options: {
        label: string
        value: string
    }[]
    direction: "horizontal" | "vertical"
    conditions: Record<string, any>
    validations: Record<string, any>
    optionType: 'default' | 'button'
    buttonStyle: 'solid' | 'outline'
}

const RadioInput = ({ name, label, options, direction, optionType, validations, buttonStyle }: RadioInputProps) => {
    const { required } = validations || {}

    const rules = [
        { required, message: `Please select ${label}` }
    ].filter(rule => rule.required)

    return (

        <Form.Item label={label} name={name} rules={rules}>

            <Radio.Group
                options={options}
                optionType={optionType}
                buttonStyle={buttonStyle}
            />

            {/* <Radio.Group optionType='button'>
                <Space direction={direction}>
                    {options.map(option => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group> */}
        </Form.Item>
    )
}

export default RadioInput