import React, { useState } from 'react'

const FontSize = ({ selectedComponent, updateProperties, parsePixelValueToNumber }) => {
    // Font Size
    const [fontsize, setFontSize] = useState(
        parsePixelValueToNumber(selectedComponent?.style?.fontSize) || 16,
    )

    const handelFontSizeChange = (e) => {
        const fSize = e.target.value
        setFontSize(fSize)
        const updatedStyle = { ...selectedComponent.style, fontSize: fSize + 'px' }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center'>
            <p className=' text-xs font-medium text-subItemGray'>Font Size</p>
            <div className=' flex items-center gap-x-2'>
                <input
                    type='number'
                    className=' w-[64px] text-xs h-[32px] appearance-none p-2 bg-bgGray rounded outline-none font-semibold'
                    value={fontsize}
                    onChange={handelFontSizeChange}
                />
                <div className=' w-[64px] h-[32px]  bg-bgGray rounded flex justify-center items-center'>
                    <p className=' text-xs font-medium text-subItemGray'>Pixels</p>
                </div>
            </div>
        </div>
    )
}

export default FontSize
