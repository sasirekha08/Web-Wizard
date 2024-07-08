import React, { useState } from 'react'

const BorderAppearance = ({ updateProperties, selectedComponent, parsePixelValueToNumber }) => {
    // Border Color
    const [borderColor, setBorderColor] = useState(selectedComponent?.style?.borderColor)
    const [borderColorPicker, setBorderColorPicker] = useState(selectedComponent?.style?.borderColor)

    const handleBorderColorPicker = (e) => {
        let color = e.target.value
        setBorderColor(color)
        setBorderColorPicker(color)
        const updatedStyle = { ...selectedComponent.style, borderColor: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    const handleBorderColor = (e) => {
        let color = e.target.value
        setBorderColor(color)
        setBorderColorPicker(color)
        const updatedStyle = { ...selectedComponent.style, borderColor: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }

    // Border Radius
    const [borderRadius, setBorderRadius] = useState(
        parsePixelValueToNumber(selectedComponent?.style?.borderRadius),
    )

    const handleBorderRadius = (e) => {
        let radius = e.target.value
        setBorderRadius(radius)
        const updatedStyle = { ...selectedComponent.style, borderRadius: `${radius}px` }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }

    return (
        <div className=''>
            <div className=' flex justify-between items-center'>
                <p className=' text-xs font-medium text-subItemGray w-[50px]'>Border color</p>
                <div className=' flex items-center w-[137px] h-[32px] bg-bgGray rounded gap-x-1 px-2 py-1'>
                    <div className=' rounded overflow-hidden  w-[23px] shrink-0 appearance-none  h-[23px]'>
                        <input
                            type='color'
                            className=' w-full h-full '
                            value={borderColor}
                            onChange={handleBorderColorPicker}
                        />
                    </div>
                    <input
                        type='text'
                        className='w-full text-xs text-[#323232] uppercase font-semibold outline-none bg-bgGray'
                        value={borderColorPicker}
                        onChange={handleBorderColor}
                    />
                </div>
            </div>
            <div className='flex justify-between items-center mt-6'>
                <label className='text-xs text-subItemGray font-medium block w-[50px] shrink-0'>
                    Border Radius
                </label>
                <div className='flex justify-between gap-2 '>
                    <input
                        type='number'
                        className='w-[64px] h-[32px] rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                        value={borderRadius}
                        onChange={handleBorderRadius}
                    />
                    <div className='w-[64px] h-[32px] rounded text-xs bg-[#F2F2F2] text-almostBlack p-2 text-center outline-none'>
                        Pixels
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorderAppearance

