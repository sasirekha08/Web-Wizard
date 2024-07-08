import React, { useState } from 'react'

const TabLayout = ({ updateProperties, selectedComponent }) => {
    //Layout Option
    const layoutTypes = ['inline', 'stacked']
    const [selectedLayout, setSelectedLayout] = useState(selectedComponent?.layout || 'inline')
    const handleLayoutChange = (e) => {
        const option = e.target.value
        setSelectedLayout(option)
        updateProperties(selectedComponent?.compId, { layout: option })
    }
    return (
        <div className=' flex justify-between items-center mt-6'>
            <p className=' text-xs font-medium text-subItemGray'>Tab Layout</p>
            <select
                value={selectedLayout}
                onChange={handleLayoutChange}
                className=' w-[137px] h-[32px] px-2   rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                {layoutTypes?.map((schema) => {
                    return (
                        <option value={schema} className='text-xs font-semibold px'>
                            {schema}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default TabLayout
