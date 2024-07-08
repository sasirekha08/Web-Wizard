import React, { useEffect, useState } from 'react'
import EditTabItem from './EditTabItem'
import { componentConfigs, componentsStyleConfig, componentsTypes } from '../../componentList'
import { RIGHT_EDIT_COMPONENT_BAR, TOP_BAR_HEIGHT } from '../../constants'

const EditComponent = ({ topBarHeight, selectedComponent, siteContent, clearSelect, updateProperties }) => {
    // Loose Comparison (Order-insensitive and Case-insensitive):
    function arraysOfStringsAreEqual(arr1, arr2) {
        if (arr1?.length !== arr2?.length) {
            return false
        }

        const sortedArr1 = arr1?.slice()?.sort()
        const sortedArr2 = arr2?.slice()?.sort()

        for (let i = 0; i < sortedArr1?.length; i++) {
            if (sortedArr1[i].toLowerCase() !== sortedArr2[i].toLowerCase()) {
                return false
            }
        }

        return true
    }
    // Update selected component styleConfig
    useEffect(() => {
        const isStyleConfigUpdated = arraysOfStringsAreEqual(
            selectedComponent?.styleConfig,
            componentsStyleConfig[selectedComponent?.type],
        )
        if (!isStyleConfigUpdated) {
            updateProperties(selectedComponent?.compId, {
                styleConfig: componentsStyleConfig[selectedComponent?.type],
            })
        }
    }, [selectedComponent?.compId, selectedComponent?.styleConfig, selectedComponent?.type, updateProperties])

    // Update selected component componentConfig
    useEffect(() => {
        const isComponentConfigUpdated = arraysOfStringsAreEqual(
            selectedComponent?.componentConfig,
            componentConfigs[selectedComponent?.type],
        )
        if (!isComponentConfigUpdated) {
            updateProperties(selectedComponent?.compId, {
                componentConfig: componentConfigs[selectedComponent?.type],
            })
        }
    }, [
        selectedComponent?.compId,
        selectedComponent?.componentConfig,
        selectedComponent?.type,
        updateProperties,
    ])
    const [editTabs, setEditTabs] = useState(null)
    useEffect(() => {
        const editTabsArr = ['Layout', 'Appearance', 'Content', 'Interaction',]
        if (selectedComponent.type === componentsTypes.CONTAINER) {
            setEditTabs(['Layout', 'Appearance', 'Interaction'])
        } else if (
            selectedComponent.type === componentsTypes.TAB_GROUP ||
            selectedComponent.type === componentsTypes.IMAGE ||
            selectedComponent.type === componentsTypes.VIDEO
        ) {
            setEditTabs(['Layout', 'Content'])
        } else {
            setEditTabs(editTabsArr)
        }
    }, [selectedComponent.type])
    return (
        <div
            className=' float-right right-0  fixed bg-white border-l-[1px] border-l-[#eee] h-full overflow z-[100]'
            style={{ top: TOP_BAR_HEIGHT + 'px', width: RIGHT_EDIT_COMPONENT_BAR + 'px' }}>
            <div className='overflow-y-auto h-full pb-40 component-bar'>
                {editTabs?.length > 0 &&
                    editTabs?.map((tab, index) => {
                        return (
                            <>
                                <EditTabItem
                                    selectedComponent={selectedComponent}
                                    siteContent={siteContent}
                                    clearSelect={clearSelect}
                                    key={index}
                                    updateProperties={updateProperties}
                                    tab={tab}
                                />
                                {editTabs?.length !== index + 1 ? (
                                    <div className=' h-[1px] w-full bg-[#EEE] mt-4' />
                                ) : null}
                            </>
                        )
                    })}
            </div>
        </div>
    )
}

export default EditComponent

