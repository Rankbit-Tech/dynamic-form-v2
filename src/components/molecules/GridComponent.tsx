import useMediaQuery from "@hooks/useMediaQuery"

interface GridComponentProps {
    cols: number
    childrenComponent: React.ReactNode
}


const GridComponent = ({ cols, childrenComponent }: GridComponentProps) => {
    const { isMobile, isTablet } = useMediaQuery();

    const gridClassName = isMobile ? 'grid grid-cols-1 gap-1' : `grid gap-1 grid-cols-${(isTablet && cols >= 2) ? 2 : cols}`;

    return (
        <div className={gridClassName}>
            {childrenComponent}
        </div >
    )
}

export default GridComponent