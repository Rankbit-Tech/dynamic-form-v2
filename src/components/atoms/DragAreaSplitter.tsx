import React from 'react'


interface TopHalfProps {
    topRef: any,
    bottomRef: any
}

const DragAreaSplitter = ({ topRef, bottomRef }: TopHalfProps) => {
    return (
        <>
            <div ref={topRef} className="absolute w-full top-0 h-[10px] rounded-t-md" />
            <div ref={bottomRef} className="absolute w-full bottom-0 h-[10px] rounded-b-md" />
        </>

    )
}

export default DragAreaSplitter