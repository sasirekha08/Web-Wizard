import React from 'react'

const TextDecoration = ({ selectedComponent, updateProperties }) => {
    const handelDecorationChange = (style, type) => {
        let updatedStyle = {}
        if (type === 'fontWeight') {
            if (selectedComponent.style?.fontWeight) {
                updatedStyle = { ...selectedComponent.style, fontWeight: '' }
            } else {
                updatedStyle = { ...selectedComponent.style, fontWeight: style }
            }
        } else if (type === 'fontStyle') {
            if (selectedComponent.style?.fontStyle) {
                updatedStyle = { ...selectedComponent.style, fontStyle: '' }
            } else {
                updatedStyle = { ...selectedComponent.style, fontStyle: style }
            }
        } else if (type === 'textDecoration') {
            if (selectedComponent.style?.textDecoration === style) {
                updatedStyle = { ...selectedComponent.style, textDecoration: '' }
            } else {
                updatedStyle = { ...selectedComponent.style, textDecoration: style }
            }
        }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center'>
            <p className=' text-xs font-medium text-subItemGray'>Alignment</p>
            <div className=' flex items-center justify-between w-[137px] h-[32px] bg-bgGray rounded  px-2 py-3'>
                <p
                    onClick={() => handelDecorationChange('italic', 'fontStyle')}
                    className={` cursor-pointer text-xs font-medium italic select-none ${
                        selectedComponent?.style?.fontStyle === 'italic' ? 'text-[#323232]' : 'text-[#989898]'
                    }`}>
                    Aa
                </p>
                <p
                    onClick={() => handelDecorationChange('underline', 'textDecoration')}
                    className={` cursor-pointer text-xs font-medium underline select-none ${
                        selectedComponent?.style?.textDecoration === 'underline'
                            ? 'text-[#323232]'
                            : 'text-[#989898]'
                    }`}>
                    Ab
                </p>
                <p
                    onClick={() => handelDecorationChange('line-through', 'textDecoration')}
                    className={` cursor-pointer text-xs font-medium line-through select-none ${
                        selectedComponent?.style?.textDecoration === 'line-through'
                            ? 'text-[#323232]'
                            : 'text-[#989898]'
                    }`}>
                    Aa
                </p>
            </div>
        </div>
    )
}

export default TextDecoration
