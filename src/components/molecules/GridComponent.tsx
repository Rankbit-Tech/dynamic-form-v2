import INPUT_FIELDS from "@constants/inputFieldConstants"

interface GridComponentProps {
    cols: number
    childrenComponent: React.ReactNode
    type: string
}


const GridComponent = ({ cols, childrenComponent }: GridComponentProps) => {
    return (
        <div className="p-2 gap-2" style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)` }}>
            {childrenComponent}
        </div>
    )
}

export default GridComponent