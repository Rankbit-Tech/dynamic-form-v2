import React from 'react'

interface DividerWithHeaderProps {
    title: string
    children?: React.ReactNode
}

const DividerWithHeader = ({ title, children }: DividerWithHeaderProps) => {
    return (
        <div className='border-b flex justify-between items-center py-2 w-full'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            {children && children}
        </div>
    )
}

export default DividerWithHeader