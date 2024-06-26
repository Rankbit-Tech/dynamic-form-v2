import INPUT_FIELDS from "@constants/inputFieldConstants"

interface GridComponentProps {
    cols: number
    children: any
    type: string
}


const GridComponent = ({ cols, children, type }: GridComponentProps) => {
    return (
        <div className="p-2 gap-2" style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)` }}>
            {children.map((child: Record<string, any>) => {
                const Component = INPUT_FIELDS[child.type].renderComponent
                if (!Component) return null
                return (
                    <Component key={child.id} {...child} />
                )
            })}
        </div>
    )
}

export default GridComponent