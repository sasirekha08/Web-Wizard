import React, { useState } from 'react'
import applicationState from '../../applicationState'
const MediaContent = ({ updateProperties, selectedComponent }) => {
    // Image Source
    const imageSourceTypeEnum = { URL: 'URL', DYNAMIC_CONTENT: 'Dynamic Content' }
    const [imageSourceType, setImageSourceType] = useState(imageSourceTypeEnum.API)
    const handelImageSourceChange = (event) => {
        const srcType = event.target.value
        if (srcType === imageSourceTypeEnum.DIRECT) {
            updateProperties(selectedComponent?.compId, { apiDetails: null })
            // setDataKey(null)
            // setApiData(null)
        }
        setImageSourceType(srcType)
    }

    // Direct URL
    const [directUrl, setDirectUrl] = useState(selectedComponent?.source || 'https://')
    const handleDirectURL = (e) => {
        setDirectUrl(e.target.value)
        updateProperties(selectedComponent?.compId, { source: e.target.value })
    }

    // Dynamic content
    const [selectedApplicationState, setSelectedApplicationState] = useState(
        selectedComponent?.apiDetails?.name || '',
    )
    const [stateKey, setStateKey] = useState(selectedComponent?.apiDetails?.key || '')

    const handelSelectedApplicationState = (e) => {
        if (e.target.value === '') {
            updateProperties(selectedComponent?.compId, { apiDetails: null })
            setStateKey('')
        } else {
            updateProperties(selectedComponent?.compId, { apiDetails: { name: e.target.value, key: null } })
            setStateKey('')
        }
        setSelectedApplicationState(e.target.value)
    }

    const handelStateKey = (e) => {
        const key = e.target.value
        if (e.target.value === '') {
            const updatedApiDetails = { ...selectedComponent.apiDetails, key: null }
            updateProperties(selectedComponent?.compId, { apiDetails: updatedApiDetails })
        } else {
            const updatedApiDetails = { ...selectedComponent.apiDetails, key }
            updateProperties(selectedComponent?.compId, { apiDetails: updatedApiDetails })
        }
        setStateKey(key)
    }

    return (
        <div>
            <div className=''>
                <div className='flex justify-between items-center gap-2'>
                    <label className='text-xs text-subItemGray font-medium block leading-3 shrink-0'>
                        Source
                    </label>
                    <select
                        className='w-[137px] h-[32px] rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                        value={imageSourceType}
                        onChange={handelImageSourceChange}>
                        {Object.values(imageSourceTypeEnum)?.map((IS) => {
                            return <option value={IS}>{IS}</option>
                        })}
                    </select>
                </div>
            </div>
            {imageSourceType === imageSourceTypeEnum.DYNAMIC_CONTENT ? (
                <>
                    <div className='mt-4'>
                        <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                            API
                        </label>
                        <select
                            className='w-full h-[32px] rounded text-xs capitalize font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                            value={selectedApplicationState}
                            onChange={handelSelectedApplicationState}>
                            <option value={''}></option>

                            {Object.keys(applicationState)?.map((stateName) => {
                                return <option value={stateName}>{stateName}</option>
                            })}
                        </select>
                    </div>
                    {(applicationState[selectedApplicationState]?.['object']?.length > 0 ||
                        applicationState[selectedApplicationState]?.['array']?.length > 0) && (
                        <div className='mt-4'>
                            <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                                Key
                            </label>

                            <select
                                className='w-full h-[32px] rounded text-xs capitalize font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                                value={stateKey}
                                onChange={handelStateKey}>
                                <option value={''}></option>

                                {applicationState[selectedApplicationState]?.['object']?.map((stateKey) => {
                                    return <option value={stateKey?.key}>{stateKey?.key}</option>
                                })}
                                {applicationState[selectedApplicationState]?.['array']?.map((stateKey) => {
                                    return <option value={stateKey?.key}>{stateKey?.key}</option>
                                })}
                            </select>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className='mt-4'>
                        <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                            URL
                        </label>
                        <input
                            type='text'
                            className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack  outline-none text-xs'
                            value={directUrl}
                            onChange={handleDirectURL}
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                            Alt Text
                        </label>
                        <textarea
                            className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack h-[96px] outline-none text-xs'
                            // value={textContent}
                            // onChange={handelTextChange}
                        ></textarea>
                    </div>
                </>
            )}
        </div>
    )
}

export default MediaContent
