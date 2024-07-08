import React, { useState } from 'react'

const Gap = ({ updateProperties, selectedComponent, parsePixelValueToNumber }) => {
    // Handel Gap
    const [gap, setGap] = useState({
        columnGap: parsePixelValueToNumber(selectedComponent?.style?.columnGap),
        rowGap: parsePixelValueToNumber(selectedComponent?.style?.rowGap),
    })

    const handelGapChange = (value, type) => {
        let updatedStyle = { ...selectedComponent.style }

        // Handle gap types
        switch (type) {
            case 'rowGap':
                updatedStyle = { ...updatedStyle, rowGap: `${value}px` }
                setGap({ ...gap, rowGap: value })
                break
            case 'columnGap':
                updatedStyle = { ...updatedStyle, columnGap: `${value}px` }
                setGap({ ...gap, columnGap: value })
                break
            default:
                // Handle default case or do nothing
                break
        }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center mt-6'>
            <p className=' text-xs font-medium text-subItemGray'>Gap</p>
            <div className=' flex flex-col gap-y-2'>
                <div className=' flex  justify-between  items-center gap-x-2'>
                    <input
                        type='number'
                        className=' w-[64px] text-xs h-[32px] appearance-none p-2 bg-bgGray rounded outline-none font-semibold'
                        value={gap.rowGap}
                        onChange={(e) => handelGapChange(e.target.value, 'rowGap')}
                    />
                    <div className=' w-[64px] h-[32px]  bg-bgGray rounded flex justify-center items-center'>
                        <p className=' text-xs font-medium text-subItemGray'>Row</p>
                    </div>
                </div>
                <div className=' flex items-center gap-x-2'>
                    <input
                        type='number'
                        className=' w-[64px] text-xs h-[32px] appearance-none p-2 bg-bgGray rounded outline-none font-semibold'
                        value={gap.columnGap}
                        onChange={(e) => handelGapChange(e.target.value, 'columnGap')}
                    />
                    <div className=' w-[64px] h-[32px]  bg-bgGray rounded flex justify-center items-center'>
                        <p className=' text-xs font-medium text-subItemGray'>Column</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gap
