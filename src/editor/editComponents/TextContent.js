import React, { useState } from 'react'
import applicationState, { DATA_TYPES } from '../../applicationState'
import { componentsTypes } from '../../componentList'
const isKeyObject = (key, currentApplicationState) => {
    const filteredArr = currentApplicationState?.filter(
        (f) => f?.key === key && (f?.type === DATA_TYPES.OBJECT || f?.type === DATA_TYPES.ARRAY),
    )
    console.log(currentApplicationState, 'filteredArr')
    return filteredArr
}
const getFirstKey = (keypath) => {
    let keyPathArr = keypath?.split('.')
    const firstKey = keyPathArr?.splice(0, 1)
    return { firstKey: firstKey?.[0], pathKey: keyPathArr?.join('.') }
}

const TextContent = ({ updateProperties, selectedComponent }) => {
    const sourceTypeEnum = { STATIC_CONTENT: 'Static Content', DYNAMIC_CONTENT: 'Dynamic Content' }
    const [sourceType, setSourceType] = useState(
        selectedComponent?.apiDetails?.name || selectedComponent?.type === componentsTypes.GROUPED_CONTAINER
            ? sourceTypeEnum.DYNAMIC_CONTENT
            : sourceTypeEnum.STATIC_CONTENT,
    )
    const handleSourceChange = (event) => {
        const srcType = event.target.value
        if (srcType === sourceTypeEnum.STATIC_CONTENT) {
            updateProperties(selectedComponent?.compId, { apiDetails: null })
            // setDataKey(null)
            // setApiData(null)
        }
        setSourceType(srcType)
    }

    // Text Content
    const [textContent, setTextContent] = useState(selectedComponent?.text || selectedComponent?.placeholder)
    const handelTextChange = (e) => {
        setTextContent(e.target.value)

        updateProperties(selectedComponent?.compId, { text: e.target.value })
    }

    // Dynamic content
    const [selectedApplicationState, setSelectedApplicationState] = useState(
        selectedComponent?.apiDetails?.name || '',
    )

    const selectedRootKey = selectedComponent?.apiDetails?.key?.split('.')?.[0]
    const [stateKey, setStateKey] = useState(selectedComponent?.apiDetails?.key || '')
    const [rootStateKey, setRootStateKey] = useState(selectedRootKey || '')

    const handelSelectedApplicationState = (e) => {
        if (e.target.value === '') {
            updateProperties(selectedComponent?.compId, { apiDetails: null })
            setStateKey('')
            setRootStateKey('')
        } else {
            updateProperties(selectedComponent?.compId, { apiDetails: { name: e.target.value, key: null } })
            setStateKey('')
            setRootStateKey('')
        }
        setSelectedApplicationState(e.target.value)
    }

    const handelStateKey = (keyValue) => {
        const key = keyValue
        if (key === '') {
            const updatedApiDetails = { ...selectedComponent.apiDetails, key: null }
            updateProperties(selectedComponent?.compId, { apiDetails: updatedApiDetails })
        } else {
            const updatedApiDetails = { ...selectedComponent.apiDetails, key }
            updateProperties(selectedComponent?.compId, { apiDetails: updatedApiDetails })
        }
        if (!keyValue?.includes('.')) {
            setRootStateKey(key)
        }
        setStateKey(key)
    }

    return (
        <div>
            {selectedComponent?.type !== componentsTypes.GROUPED_CONTAINER ? (
                <div className=''>
                    <div className='flex justify-between items-center gap-2'>
                        <label className='text-xs text-subItemGray font-medium block leading-3 shrink-0'>
                            Source
                        </label>
                        <select
                            className='w-[137px] h-[32px] rounded text-xs font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                            value={sourceType}
                            onChange={handleSourceChange}>
                            {Object.values(sourceTypeEnum)?.map((IS) => {
                                return <option value={IS}>{IS}</option>
                            })}
                        </select>
                    </div>
                </div>
            ) : null}

            {sourceType === sourceTypeEnum.DYNAMIC_CONTENT ? (
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
                    {applicationState[selectedApplicationState]?.child?.length > 0 && (
                        <div className='mt-4'>
                            <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                                Key
                            </label>

                            <select
                                className='w-full h-[32px] rounded text-xs capitalize font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                                value={rootStateKey}
                                onChange={(e) => handelStateKey(e.target.value)}>
                                <option value={''}></option>

                                {applicationState[selectedApplicationState]?.child?.map((stateKeyC) => {
                                    return <option value={stateKeyC?.key}>{stateKeyC?.key}</option>
                                })}
                            </select>
                        </div>
                    )}
                    {isKeyObject(rootStateKey, applicationState[selectedApplicationState]?.child)?.length >
                    0 ? (
                        <RecursionKeySelection
                            handelStateKey={handelStateKey}
                            stateKey={stateKey}
                            selectedKeyState={
                                isKeyObject(
                                    rootStateKey,
                                    applicationState[selectedApplicationState]?.child,
                                )?.[0]
                            }
                            preSelected={getFirstKey(stateKey)?.pathKey}
                        />
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <div className='mt-6'>
                    <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                        Value
                    </label>
                    <textarea
                        className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack h-[96px] outline-none text-xs'
                        value={textContent}
                        onChange={handelTextChange}></textarea>
                </div>
            )}
        </div>
    )
}

export default TextContent

const RecursionKeySelection = ({ handelStateKey, selectedKeyState, stateKey, preSelected }) => {
    const { firstKey, pathKey } = getFirstKey(preSelected)
    console.log(firstKey, pathKey, 'getFirstKey')
    const [key, setKey] = useState(firstKey || '')
    const handelKey = (e) => {
        setKey(e.target.value)
        handelStateKey(`${stateKey}.${e.target.value}`)
    }
    return (
        <>
            <div className=' mt-4'>
                <select
                    className='w-full h-[32px] rounded text-xs capitalize font-semibold bg-[#F2F2F2] text-almostBlack p-2 outline-none'
                    value={key}
                    onChange={handelKey}>
                    <option value={''}></option>

                    {selectedKeyState?.child?.map((stateKeyO) => {
                        return <option value={stateKeyO?.key}>{stateKeyO?.key}</option>
                    })}
                </select>
            </div>
            {isKeyObject(key, selectedKeyState?.child)?.length > 0 ? (
                <RecursionKeySelection
                    handelStateKey={handelStateKey}
                    selectedKeyState={isKeyObject(key, selectedKeyState?.child)?.[0]}
                    stateKey={stateKey}
                    preSelected={pathKey}
                />
            ) : null}
        </>
    )
}
