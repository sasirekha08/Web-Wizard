import React, { useState } from 'react'

const Display = ({ selectedComponent, updateProperties }) => {
    const displayTypeArr = [
        { property: 'none', name: 'None' },
        { property: 'grid', name: 'Grid' },
        { property: 'flex', name: 'Flex' },
    ]
    const [displayType, setDisplayType] = useState(selectedComponent?.style?.display || displayTypeArr?.[0])

    // Whenever adding new properties for flex or grid update the names in below
    const displayStyles = {
        flex: ['flexDirection', 'justifyContent'],
        grid: ['gridTemplateColumns'],
    }
    const handelDisplayChange = (e) => {
        const display = e.target.value
        setDisplayType(display)
        const updatedStyle = { ...selectedComponent.style, display: display }
        if (display === 'none') {
            delete updatedStyle['display']
            displayStyles?.flex?.forEach((data) => {
                delete updatedStyle[data]
            })
            displayStyles?.grid?.forEach((data) => {
                console.log('inforeach', updatedStyle[data])
                delete updatedStyle[data]
            })
            setFlexDirection('')
            setGridColumns('')
        }

        if (selectedComponent?.style?.display) {
            const isGridDisplay = display === 'grid'
            const isFlexDisplay = display === 'flex'

            if (isGridDisplay) {
                console.log('In Grid display')

                displayStyles?.flex?.forEach((data) => {
                    delete updatedStyle[data]
                })
                setFlexDirection('')
            } else if (isFlexDisplay) {
                console.log('In flex display')
                displayStyles?.grid?.forEach((data) => {
                    console.log('inforeach', updatedStyle[data])
                    delete updatedStyle[data]
                })
                setGridColumns('')
            }
        }

        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }

    // Flex Direction
    const flexDirectionArr = ['row', 'column', 'row-reverse', ' column-reverse']
    const [flexDirection, setFlexDirection] = useState(
        selectedComponent?.style?.flexDirection || flexDirectionArr?.[0],
    )

    const handleFlexDirection = (e) => {
        const direction = e.target.value
        setFlexDirection(direction)
        const updatedStyle = { ...selectedComponent.style, flexDirection: direction }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }

    // Grid Column
    const gridColumnsArr = [1, 2, 3, 4, 5, 6, 7]
    const [gridColumns, setGridColumns] = useState(
        selectedComponent?.style?.gridTemplateColumns || `repeat(${gridColumnsArr?.[0]}, minmax(0, 1fr))`,
    )

    const handleGridColumns = (e) => {
        const columns = e.target.value
        setGridColumns(columns)
        const updatedStyle = {
            ...selectedComponent.style,
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    console.log('Updated component', selectedComponent)

    // Justify Content
    const justifyContentOpt = [
        { property: 'normal', name: 'Normal' },
        { property: 'flex-start', name: 'Flex start' },
        { property: 'flex-end', name: 'Flex end' },
        { property: 'center', name: 'Center' },
        { property: 'space-between', name: 'Space between' },
        { property: 'space-around', name: 'Space around' },
        { property: 'space-evenly', name: 'Space evenly' },
        { property: 'stretch', name: 'Stretch' },
    ]
    const [justifyContent, setJustifyContentOpt] = useState(
        selectedComponent?.style?.justifyContent || justifyContentOpt?.[0],
    )

    const handleJustifyContent = (e) => {
        const value = e.target.value
        setJustifyContentOpt(value)
        const updatedStyle = { ...selectedComponent.style, justifyContent: value }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }

    // Align Items
    const alignItemsOpt = [
        { property: 'flex-start', name: 'Flex start' },
        { property: 'flex-end', name: 'Flex end' },
        { property: 'center', name: 'Center' },
        { property: 'baseline', name: 'Baseline' },
        { property: 'stretch', name: 'Stretch' },
    ]

    const [alignItems, setAlignItemsOpt] = useState(
        selectedComponent?.style?.alignItems || alignItemsOpt?.[0],
    )

    const handleAlignItems = (e) => {
        const value = e.target.value
        setAlignItemsOpt(value)
        const updatedStyle = { ...selectedComponent.style, alignItems: value }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <>
            <div className=' flex justify-between items-center'>
                <p className=' text-xs font-medium text-subItemGray'>Display</p>
                <select
                    value={displayType}
                    onChange={handelDisplayChange}
                    className=' w-[137px] h-[32px] px-2   rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                    {displayTypeArr?.map((schema) => {
                        return (
                            <option value={schema.property} className='text-xs font-semibold px'>
                                {schema.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            {displayType === 'grid' ? (
                <>
                    <div className=' flex justify-between items-center mt-6'>
                        <p className=' text-xs font-medium text-subItemGray'>Grid Columns</p>
                        <select
                            value={gridColumns}
                            onChange={handleGridColumns}
                            className=' w-[137px] h-[32px] px-2  shrink-0 rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                            {gridColumnsArr?.map((schema) => {
                                return (
                                    <option value={schema} className='text-xs font-semibold px'>
                                        {schema}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </>
            ) : null}
            {displayType === 'flex' ? (
                <>
                    <div className=' flex justify-between items-center mt-6'>
                        <p className=' text-xs font-medium text-subItemGray'>Flex Direction</p>
                        <select
                            value={flexDirection}
                            onChange={handleFlexDirection}
                            className=' w-[137px] h-[32px] px-2  shrink-0  rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                            {flexDirectionArr?.map((schema) => {
                                return (
                                    <option value={schema} className='text-xs font-semibold px'>
                                        {schema}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className=' flex justify-between items-center mt-6'>
                        <p className=' text-xs font-medium text-subItemGray'>Justify Content</p>
                        <select
                            value={justifyContent}
                            onChange={handleJustifyContent}
                            className=' w-[137px] h-[32px] px-2 shrink-0  rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                            {justifyContentOpt?.map((schema) => {
                                return (
                                    <option value={schema.property} className='text-xs font-semibold px'>
                                        {schema.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className=' flex justify-between items-center mt-6'>
                        <p className=' text-xs font-medium text-subItemGray'>Align Items</p>
                        <select
                            value={alignItems}
                            onChange={handleAlignItems}
                            className=' w-[137px] h-[32px] px-2 shrink-0  rounded text-xs font-semibold outline-none bg-bgGray row-start-1 col-start-1'>
                            {alignItemsOpt?.map((schema) => {
                                return (
                                    <option value={schema.property} className='text-xs font-semibold px'>
                                        {schema.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Display

