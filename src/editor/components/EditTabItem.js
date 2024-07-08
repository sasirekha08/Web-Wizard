import React, { useState } from 'react'
import { componentsTypes, styleProperties } from '../../componentList'
import Margin from '../editComponents/Margin'
import Padding from '../editComponents/Padding'
import Dimensions from '../editComponents/Dimensions'
import Border from '../editComponents/Border'
import BorderAppearance from '../editComponents/BorderAppearance'
import TextDecoration from '../editComponents/TextDecoration'
import TextAlignment from '../editComponents/TextAlignment'
import BackGroundColor from '../editComponents/BackGroundColor'
import TextColor from '../editComponents/TextColor'
import FontSize from '../editComponents/FontSize'
import FontWeight from '../editComponents/FontWeight'
import TextContent from '../editComponents/TextContent'
import MediaContent from '../editComponents/MediaContent'
import TabContent from '../editComponents/TabContent'
import Display from '../editComponents/Display'
import Gap from '../editComponents/Gap'
import TabLayout from '../editComponents/TabLayout'
import SEO from '../editComponents/SEO'

const EditTabItem = ({ tab, selectedComponent, siteContent, clearSelect, updateProperties }) => {
    const [selectedTab, setSelectedTab] = useState(tab)
    const [isTabBarOpen, setIsTabBarOpen] = useState(true)

    const parsePixelValueToNumber = (value) => {
        // Example: Convert '10px' to 10
        return value ? parseFloat(value.replace('px', '')) : 0
    }

    // Add Route
    const [btnRoute, setBtnRoute] = useState('https://')
    const handleBtnRouteChange = (event) => {
        let route = event.target.value
        setBtnRoute(route)
        const updatedStyle = { ...selectedComponent?.eventHandler, eventValue: route }
        updateProperties(selectedComponent?.compId, { eventHandler: updatedStyle })
    }

    return (
        <>
            <div
                className=''
                // onClick={() => {
                //     setSelectedTab(tab)
                //     setIsTabBarOpen(!isTabBarOpen)
                // }}
            >
                <div className={` flex items-center justify-between px-4 pt-4`}>
                    <p className=' text-xs font-semibold text-almostBlack'>{tab}</p>
                    {/* <IoChevronDownSharp
                        className={`${isTabBarOpen ? 'rotate-180' : ' rotate-0'}   text-almostBlack`}
                    /> */}
                </div>
            </div>
            {selectedTab && isTabBarOpen && (
                <div className='mt-4'>
                    {selectedTab === 'Layout' ? (
                        <div className='pl-6 pr-4 space-y-6'>
                            {selectedComponent?.styleConfig?.length > 0 &&
                                selectedComponent?.styleConfig?.map((styleType) => {
                                    if (styleType === styleProperties.MARGIN) {
                                        return (
                                            <Margin
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.PADDING) {
                                        return (
                                            <Padding
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.DIMENSIONS) {
                                        return (
                                            <Dimensions
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.BORDER) {
                                        return (
                                            <Border
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.DISPLAY) {
                                        return (
                                            <Display
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.GAP) {
                                        return (
                                            <Gap
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    return null
                                })}
                            {selectedComponent?.type === componentsTypes.TAB_GROUP ? (
                                <TabLayout
                                    selectedComponent={selectedComponent}
                                    updateProperties={updateProperties}
                                />
                            ) : null}
                        </div>
                    ) : null}

                    {selectedTab === 'Appearance' ? (
                        <div className='pl-6 pr-4 space-y-6'>
                            {selectedComponent?.styleConfig?.length > 0 &&
                                selectedComponent?.styleConfig?.map((styleType) => {
                                    if (styleType === styleProperties.BORDER) {
                                        return (
                                            <BorderAppearance
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.FONT_WEIGHT) {
                                        return (
                                            <FontWeight
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.FONT_SIZE) {
                                        return (
                                            <FontSize
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                                parsePixelValueToNumber={parsePixelValueToNumber}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.TEXT_COLOR) {
                                        return (
                                            <TextColor
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.BACKGROUND_COLOR) {
                                        return (
                                            <BackGroundColor
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.TEXT_ALIGNMENT) {
                                        return (
                                            <TextAlignment
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                            />
                                        )
                                    }
                                    if (styleType === styleProperties.FONT_STYLE) {
                                        return (
                                            <TextDecoration
                                                selectedComponent={selectedComponent}
                                                updateProperties={updateProperties}
                                            />
                                        )
                                    }
                                    return null
                                })}
                        </div>
                    ) : null}

                    {selectedTab === 'Content' ? (
                        <>
                            <div className='pl-6 pr-4 space-y-6'>
                                {selectedComponent?.type === componentsTypes.TEXT ||
                                selectedComponent?.type === componentsTypes.BUTTON ||
                                selectedComponent?.type === componentsTypes.GROUPED_CONTAINER ? (
                                    <TextContent
                                        selectedComponent={selectedComponent}
                                        updateProperties={updateProperties}
                                    />
                                ) : null}

                                {selectedComponent?.type === componentsTypes.IMAGE ||
                                selectedComponent?.type === componentsTypes.VIDEO ? (
                                    <MediaContent
                                        selectedComponent={selectedComponent}
                                        updateProperties={updateProperties}
                                    />
                                ) : null}
                            </div>
                            <div className='pl-6 pr-4'>
                                {selectedComponent?.type === componentsTypes.TAB_GROUP ? (
                                    <TabContent
                                        selectedComponent={selectedComponent}
                                        updateProperties={updateProperties}
                                    />
                                ) : null}
                            </div>
                        </>
                    ) : null}

                    {selectedTab === 'Interaction' ? (
                        <div className='pl-6 pr-4 space-y-6'>
                            <div className=''>
                                <p className='text-xs text-subItemGray font-medium block leading-3 shrink-0'>
                                    On Button Click
                                </p>

                                <div className='mt-4'>
                                    <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                                        Link To
                                    </label>
                                    <input
                                        type='text'
                                        className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack  outline-none text-xs'
                                        value={btnRoute}
                                        onChange={handleBtnRouteChange}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {/* {selectedTab === 'SEO' ? (
                        <div className='pl-6 pr-4 space-y-6'>
                            <SEO selectedComponent={selectedComponent} updateProperties={updateProperties} />
                        </div>
                    ) : null} */}
                </div>
            )}
        </>
    )
}

export default EditTabItem
