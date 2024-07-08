import React, { useState } from 'react'

const Margin = ({ updateProperties, selectedComponent, parsePixelValueToNumber }) => {
    // Margin
    const [margin, setMargin] = useState({
        marginTop: parsePixelValueToNumber(selectedComponent?.style?.marginTop),
        marginBottom: parsePixelValueToNumber(selectedComponent?.style?.marginBottom),
        marginLeft: parsePixelValueToNumber(selectedComponent?.style?.marginLeft),
        marginRight: parsePixelValueToNumber(selectedComponent?.style?.marginRight),
    })

    const handelMarginChange = (value, type) => {
        let updatedStyle = { ...selectedComponent.style }

        // Handle margin types
        switch (type) {
            case 'marginTop':
                updatedStyle = { ...updatedStyle, marginTop: `${value}px` }
                setMargin({ ...margin, marginTop: value })
                break
            case 'marginBottom':
                updatedStyle = { ...updatedStyle, marginBottom: `${value}px` }
                setMargin({ ...margin, marginBottom: value })
                break
            case 'marginLeft':
                updatedStyle = { ...updatedStyle, marginLeft: `${value}px` }
                setMargin({ ...margin, marginLeft: value })
                break
            case 'marginRight':
                updatedStyle = { ...updatedStyle, marginRight: `${value}px` }
                setMargin({ ...margin, marginRight: value })
                break
            default:
                // Handle default case or do nothing
                break
        }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className='flex justify-between items-center'>
            <label className='text-xs text-subItemGray font-medium block  shrink-0'>Margin</label>
            <div className='flex flex-col '>
                <div className='flex justify-between gap-2'>
                    <div className='flex items-center bg-[#F2F2F2] rounded p-2 w-[64px] h-[32px]'>
                        <input
                            type='number'
                            className='w-full rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack  outline-none'
                            value={margin.marginTop}
                            onChange={(e) => handelMarginChange(e.target.value, 'marginTop')}
                        />
                        <svg
                            width='8'
                            height='9'
                            viewBox='0 0 8 9'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M0.579545 1.21023V0.272727H7.125V1.21023H4.38068V9H3.32386V1.21023H0.579545Z'
                                fill='#989898'
                            />
                        </svg>
                    </div>
                    <div className='flex items-center bg-[#F2F2F2] rounded p-2 w-[64px] h-[32px]'>
                        <input
                            type='number'
                            className='w-full rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack  outline-none'
                            value={margin.marginBottom}
                            onChange={(e) => handelMarginChange(e.target.value, 'marginBottom')}
                        />
                        <svg
                            width='7'
                            height='9'
                            viewBox='0 0 7 9'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M0.154474 9V0.272727H3.20561C3.81357 0.272727 4.31499 0.377841 4.70987 0.588068C5.10476 0.795454 5.39879 1.07528 5.59197 1.42756C5.78516 1.77699 5.88175 2.16477 5.88175 2.59091C5.88175 2.96591 5.81499 3.27557 5.68146 3.51989C5.55078 3.7642 5.37749 3.95739 5.16158 4.09943C4.94851 4.24148 4.71697 4.34659 4.46697 4.41477V4.5C4.73402 4.51705 5.00249 4.6108 5.27237 4.78125C5.54226 4.9517 5.76811 5.19602 5.94993 5.5142C6.13175 5.83239 6.22266 6.22159 6.22266 6.68182C6.22266 7.11932 6.12322 7.51278 5.92436 7.86222C5.7255 8.21165 5.41158 8.48864 4.9826 8.69318C4.55362 8.89773 3.99538 9 3.30788 9H0.154474ZM1.21129 8.0625H3.30788C3.99822 8.0625 4.48828 7.92898 4.77805 7.66193C5.07067 7.39205 5.21697 7.06534 5.21697 6.68182C5.21697 6.38636 5.14169 6.11364 4.99112 5.86364C4.84055 5.6108 4.62607 5.40909 4.34766 5.25852C4.06925 5.10511 3.7397 5.02841 3.35902 5.02841H1.21129V8.0625ZM1.21129 4.10795H3.17152C3.4897 4.10795 3.77663 4.04545 4.03232 3.92045C4.29084 3.79545 4.49538 3.61932 4.64595 3.39205C4.79936 3.16477 4.87607 2.89773 4.87607 2.59091C4.87607 2.20739 4.74254 1.8821 4.4755 1.61506C4.20845 1.34517 3.78516 1.21023 3.20561 1.21023H1.21129V4.10795Z'
                                fill='#989898'
                            />
                        </svg>
                    </div>
                </div>
                <div className='flex justify-between gap-2 mt-2'>
                    <div className='flex items-center bg-[#F2F2F2] rounded p-2 w-[64px] h-[32px]'>
                        <input
                            type='number'
                            className='w-full rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack  outline-none'
                            value={margin.marginLeft}
                            onChange={(e) => handelMarginChange(e.target.value, 'marginLeft')}
                        />
                        <svg
                            width='6'
                            height='9'
                            viewBox='0 0 6 9'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M0.0568182 9V0.272727H1.11364V8.0625H5.17045V9H0.0568182Z'
                                fill='#989898'
                            />
                        </svg>
                    </div>
                    <div className='flex items-center bg-[#F2F2F2] rounded p-2 w-[64px] h-[32px]'>
                        <input
                            type='number'
                            className='w-full rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack  outline-none'
                            value={margin.marginRight}
                            onChange={(e) => handelMarginChange(e.target.value, 'marginRight')}
                        />
                        <svg
                            width='7'
                            height='9'
                            viewBox='0 0 7 9'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M0.218928 9V0.272727H3.16779C3.84961 0.272727 4.40927 0.389204 4.84677 0.622159C5.28427 0.852272 5.60813 1.16903 5.81836 1.57244C6.02859 1.97585 6.1337 2.43466 6.1337 2.94886C6.1337 3.46307 6.02859 3.91903 5.81836 4.31676C5.60813 4.71449 5.28569 5.02699 4.85103 5.25426C4.41637 5.47869 3.86097 5.59091 3.18484 5.59091H0.798473V4.63636H3.15075C3.61665 4.63636 3.99165 4.56818 4.27575 4.43182C4.56268 4.29545 4.77006 4.10227 4.8979 3.85227C5.02859 3.59943 5.09393 3.2983 5.09393 2.94886C5.09393 2.59943 5.02859 2.29403 4.8979 2.03267C4.76722 1.77131 4.55842 1.5696 4.27148 1.42756C3.98455 1.28267 3.60529 1.21023 3.1337 1.21023H1.27575V9H0.218928ZM4.32688 5.07955L6.47461 9H5.24734L3.1337 5.07955H4.32688Z'
                                fill='#989898'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Margin
