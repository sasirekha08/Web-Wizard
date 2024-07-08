import React, { useState } from 'react'

const Dimensions = ({ updateProperties, selectedComponent, parsePixelValueToNumber }) => {
    // Width and Height

    const [dimensions, setDimensions] = useState({
        width: parsePixelValueToNumber(selectedComponent?.style?.width),
        height: parsePixelValueToNumber(selectedComponent?.style?.height),
    })

    const handleDimensionsChange = (value, type) => {
        let updatedStyle = { ...selectedComponent.style }
        const style = parseInt(value) === 0 ? 'auto' : `${value}px`
        switch (type) {
            case 'width':
                updatedStyle = { ...updatedStyle, width: style }
                setDimensions({ ...dimensions, width: value })
                break
            case 'height':
                updatedStyle = { ...updatedStyle, height: style }
                setDimensions({ ...dimensions, height: value })
                break
            default:
                // Handle default case or do nothing
                break
        }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=''>
            <div className='flex justify-between items-center '>
                <label className='text-xs text-subItemGray font-medium block  shrink-0'>Width</label>
                <div className='flex flex-col'>
                    <div className='flex justify-between gap-2'>
                        <input
                            type='number'
                            className='w-[64px] h-[32px] rounded font-semibold text-xs bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                            value={dimensions.width}
                            onChange={(e) => handleDimensionsChange(e.target.value, 'width')}
                        />
                        <div className='w-[64px] h-[32px] rounded text-xs bg-[#F2F2F2] text-almostBlack p-2 text-center outline-none'>
                            Pixels
                        </div>
                        {/* <select
                    className='w-full rounded text-xs bg-[#F2F2F2] text-almostBlack p-1 outline-none'
                    // value={imageSourceType}
                    // onChange={handelImageSourceChange}
                >
                    <option value='pixels'>Pixels</option>
                </select> */}
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <label className='text-xs text-subItemGray font-medium block  shrink-0'>Height</label>
                <div className='flex flex-col'>
                    <div className='flex justify-between gap-2'>
                        <input
                            type='number'
                            className='w-[64px] h-[32px] rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                            value={dimensions.height}
                            onChange={(e) => handleDimensionsChange(e.target.value, 'height')}
                        />
                        <div className='w-[64px] h-[32px] rounded text-xs bg-[#F2F2F2] text-almostBlack p-2 text-center outline-none'>
                            Pixels
                        </div>
                        {/* <select
                    className='w-full rounded text-xs bg-[#F2F2F2] text-almostBlack p-1 outline-none'
                    // value={imageSourceType}
                    // onChange={handelImageSourceChange}
                >
                    <option value='pixels'>Pixels</option>
                </select> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dimensions

