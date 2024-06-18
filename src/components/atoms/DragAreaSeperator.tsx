import React from 'react'

interface DragAreaSeperatorProps {
    topHalf: any,
    bottomHalf: any,
    children: React.ReactNode
}

const DragAreaSeperator = ({ topHalf, bottomHalf, children }: DragAreaSeperatorProps) => {
    return (
        <>
            {topHalf.isOver && <div className="absolute top-0 w-full z-10 rounded-md h-[7px] bg-gray-700 rounded-b-none" />}
            {children}
            {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-gray-700 rounded-t-none" />}

        </>
    )
}

export default DragAreaSeperator