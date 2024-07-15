import useMediaQuery from "@hooks/useMediaQuery"

interface GridComponentProps {
    cols: number
    childrenComponent: React.ReactNode
}


const GridComponent = ({ cols, childrenComponent }: GridComponentProps) => {
    const { isMobile, isTablet } = useMediaQuery();

    const gridClassName = isMobile ? 'p-2 grid gap-2 grid-cols-1' : `p-2 grid gap-2 grid-cols-${(isTablet && cols >= 2) ? 2 : cols}`;

    return (
        <div className={gridClassName}>
            {childrenComponent}
        </div >
    )
}

export default GridComponent