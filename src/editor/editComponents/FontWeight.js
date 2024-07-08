import React, { useState } from 'react'

const FontWeight = ({ selectedComponent, updateProperties }) => {
    // Font Weight
    const [fontWeight, setFontWeight] = useState(selectedComponent?.style?.fontWeight || '400')
    const fontWeightArr = [
        {
            name: 'Thin',
            value: 100,
        },
        {
            name: 'Extra light',
            value: 200,
        },
        {
            name: 'Light',
            value: 300,
        },
        {
            name: 'Normal',
            value: 400,
        },
        {
            name: 'Medium',
            value: 500,
        },
        {
            name: 'Semi bold',
            value: 600,
        },
        {
            name: 'Bold',
            value: 700,
        },
        {
            name: 'Extra bold',
            value: 800,
        },
        {
            name: 'black',
            value: 900,
        },
    ]
    const handelFontWeightChange = (e) => {
        const fontWeight = e.target.value
        setFontWeight(fontWeight)
        const updatedStyle = { ...selectedComponent.style, fontWeight: fontWeight }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center'>
            <p className=' text-xs font-medium text-subItemGray'>Weight</p>
            <select
                value={fontWeight}
                onChange={handelFontWeightChange}
                className=' w-[137px] h-[32px] px-2   rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                {fontWeightArr?.map((schema) => {
                    return (
                        <option value={schema.value} className='text-xs font-semibold px'>
                            {schema.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FontWeight
