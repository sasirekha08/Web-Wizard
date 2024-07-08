import React, { useState } from 'react'

const TextColor = ({ selectedComponent, updateProperties, parsePixelValueToNumber }) => {
    const [textColor, setTextColor] = useState(selectedComponent?.style?.color)
    const [textColorPicker, setTextColorPicker] = useState(selectedComponent?.style?.color)

    const handleTextColorPicker = (e) => {
        let color = e.target.value
        setTextColorPicker(color)
        setTextColor(color)
        const updatedStyle = { ...selectedComponent.style, color: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    const handleTextColor = (e) => {
        let color = e.target.value
        setTextColor(color)
        setTextColorPicker(color)
        const updatedStyle = { ...selectedComponent.style, color: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center '>
            <p className=' text-xs font-medium text-subItemGray'>Color</p>
            <div className=' flex items-center w-[137px] h-[32px] bg-bgGray rounded gap-x-1 px-2 py-1'>
                <div className=' rounded overflow-hidden  w-[23px] shrink-0 appearance-none  h-[23px]'>
                    <input
                        type='color'
                        className=' w-full h-full '
                        value={textColorPicker}
                        onChange={handleTextColorPicker}
                    />
                </div>
                <input
                    type='text'
                    className='w-full text-xs text-[#323232] uppercase font-semibold outline-none bg-bgGray'
                    value={textColor}
                    onChange={handleTextColor}
                />
            </div>
        </div>
    )
}

export default TextColor
