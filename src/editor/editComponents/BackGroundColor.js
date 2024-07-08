import React, { useState } from 'react'

const BackGroundColor = ({ selectedComponent, updateProperties }) => {
    const [backGroundColor, setBackGroundColor] = useState(selectedComponent?.style?.backgroundColor)
    const [backGroundColorPicker, setBackGroundColorPicker] = useState(
        selectedComponent?.style?.backgroundColor,
    )

    const handleBackGroundColorPicker = (e) => {
        let color = e.target.value
        setBackGroundColor(color)
        setBackGroundColorPicker(color)
        const updatedStyle = { ...selectedComponent.style, backgroundColor: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    const handleBackGroundColor = (e) => {
        let color = e.target.value
        setBackGroundColor(color)
        setBackGroundColorPicker(color)
        const updatedStyle = { ...selectedComponent.style, backgroundColor: color }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center '>
            <p className=' text-xs font-medium text-subItemGray w-[50px]'>Background Color</p>
            <div className=' flex items-center w-[137px] h-[32px] bg-bgGray rounded shrink-0 gap-x-1 px-2 py-1'>
                <div className=' rounded overflow-hidden  w-[23px] shrink-0 appearance-none  h-[23px]'>
                    <input
                        type='color'
                        className=' w-full h-full '
                        value={backGroundColor}
                        onChange={handleBackGroundColorPicker}
                    />
                </div>
                <input
                    type='text'
                    className='w-full text-xs text-[#323232] uppercase font-semibold outline-none bg-bgGray'
                    value={backGroundColorPicker}
                    onChange={handleBackGroundColor}
                />
            </div>
        </div>
    )
}

export default BackGroundColor

