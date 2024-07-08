import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { componentsTypes } from '../../componentList'
// Components
import EditorParagraph from '../../components/paragraph/EditorParagraph'
import EditorButton from '../../components/button/EditorButton'
import ContextMenu from './ContextMenu'
import EditComponent from './EditComponent'
import EditorContainer from '../../components/container/EditorContainer'
import RecursiveEditorElements from './RecursiveEditorElements'
import { TOP_BAR_HEIGHT } from '../../constants'

const BuildArea = ({
    updateSiteContent,
    siteContent,
    selectedComponent,
    setSelectedComponent,
    builderAreaWidth,
}) => {
    const [selectedElement, setSelectedElement] = useState('')
    const [contextMenuPoints, setContextMenuPoints] = useState({})

    const [elementOverContainer, setElementOverContainer] = useState('')
    const [elementOverTabUI, setElementOverTabUI] = useState('')

    useEffect(() => {
        const handleClick = () => {
            setSelectedElement('')
            setContextMenuPoints({})
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    const handleDrop = (e) => {
        e.preventDefault()
        if (!elementOverContainer) {
            const item = e.dataTransfer.getData('text/plain')
            if (item) {
                // setDroppedItem(item);
                try {
                    const component = JSON.parse(item)
                    let updatedSiteContent = siteContent
                    if (component?.compId) {
                        updatedSiteContent = deleteElementFromSiteContent(component?.compId, siteContent)
                    } else {
                        component.compId = uuidv4()
                    }
                    const previousOrderNumber = siteContent[siteContent?.length - 1]?.order
                    if (siteContent?.length === 0) {
                        component.order = 1
                    } else {
                        component.order = previousOrderNumber + 1
                    }
                    updateSiteContent([...updatedSiteContent, component])
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const onContextMenuHandler = (e, compDetails) => {
        e.preventDefault()
        setSelectedElement(compDetails)
        console.log(e, 'onContextMenuHandler')
        setContextMenuPoints({
            x: e.clientX,
            y: e.clientY,
        })
    }

    console.log('SELCTED ELEMENT', selectedElement)
    console.log('Site content', siteContent)

    const deleteElementFromSiteContent = (selectedCompId, siteContentData) => {
        const deleteChildElement = (container) => {
            if (container.compId === selectedCompId) {
                // Return null to remove the matching element
                return null
            } else if (container.children) {
                // Filter out children and apply the function recursively
                const updatedChildren = container.children
                    .map((child) => deleteChildElement(child))
                    .filter(Boolean)
                return { ...container, children: updatedChildren }
            }
            return container
        }
        return siteContentData.map((element) => deleteChildElement(element)).filter(Boolean)
    }

    const deleteElementHandler = (compId) => {
        const selectedCompId = selectedElement?.compId || compId
        const updatedSiteContent = deleteElementFromSiteContent(selectedCompId, siteContent)
        updateSiteContent(updatedSiteContent)
    }

    const clearSelect = () => {
        setSelectedComponent(null)
    }

    console.log(siteContent, 'siteContent')
    console.log(selectedComponent, 'selectedComponent')

    const [draggedItem, setDraggedItem] = useState(null)

    const handleListDragStart = (e, element) => {
        setDraggedItem(element?.compId)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', JSON.stringify(element))
    }

    const handleListDragOver = (e) => {
        e.preventDefault()
    }

    const handleListDrop = (e, id) => {
        e.preventDefault()
        const item = e.dataTransfer.getData('text/plain')
        let component = {}
        try {
            component = JSON.parse(item)
        } catch (error) {
            console.log(error)
        }
        let deleteMovedElement = false

        const dropTargetIndex = siteContent.findIndex((item) => item.compId === id)
        const draggedItemIndex = siteContent.findIndex((item) => item.compId === draggedItem)
        console.log(dropTargetIndex, draggedItemIndex)

        if (id && draggedItem && dropTargetIndex !== -1 && draggedItemIndex !== -1) {
            const updatedItems = siteContent.slice()

            // Swap order
            ;[updatedItems[draggedItemIndex].order, updatedItems[dropTargetIndex].order] = [
                updatedItems[dropTargetIndex].order,
                updatedItems[draggedItemIndex].order,
            ]

            // Swap positions
            ;[updatedItems[draggedItemIndex], updatedItems[dropTargetIndex]] = [
                updatedItems[dropTargetIndex],
                updatedItems[draggedItemIndex],
            ]
            updateSiteContent(updatedItems)
            setDraggedItem(null)
        } else {
            const reOrderElement = (container) => {
                let childDropTargetIndex = -1
                let childDraggedItemIndex = -1
                const elementsAreSiblings = container?.children?.filter((child, index) => {
                    if (child?.compId === id) {
                        childDropTargetIndex = index
                        return true
                    }
                    if (child?.compId === draggedItem) {
                        childDraggedItemIndex = index
                        return true
                    }
                    return false
                })
                if (elementsAreSiblings?.length === 2) {
                    // do the reorder
                    const newChildren = [...container.children]
                    ;[newChildren[childDraggedItemIndex], newChildren[childDropTargetIndex]] = [
                        newChildren[childDropTargetIndex],
                        newChildren[childDraggedItemIndex],
                    ]
                    console.log(elementsAreSiblings, 'elementsAreSiblings')
                    container.children = newChildren
                    // Swap order
                    ;[
                        container.children[childDraggedItemIndex].order,
                        container.children[childDropTargetIndex].order,
                    ] = [
                        container.children[childDropTargetIndex].order,
                        container.children[childDraggedItemIndex].order,
                    ]
                } else if (childDropTargetIndex !== -1 && elementsAreSiblings?.length === 1) {
                    try {
                        const component = JSON.parse(item)
                        console.log(component, 'item')
                        const order = container.children?.length
                            ? container.children[container.children.length - 1].order + 1
                            : 1
                        component.compId = uuidv4()
                        component.order = order

                        container?.children.push(component)
                        deleteMovedElement = true
                    } catch (error) {
                        console.log(error)
                    }
                } else if (container.children) {
                    container.children = container.children.map((child) => reOrderElement(child))
                }
                return container
            }
            const afterReorderingElement = siteContent.map((element) => reOrderElement(element))
            let updatedSiteContent = afterReorderingElement
            if (deleteMovedElement) {
                updatedSiteContent = deleteElementFromSiteContent(component?.compId, afterReorderingElement)
            }
            updateSiteContent(updatedSiteContent)
        }
    }

    const handleContainerDrop = (e, comp) => {
        e.preventDefault()
        const item = e.dataTransfer.getData('text/plain')
        const compId = comp?.compId
        let component = {}
        try {
            component = JSON.parse(item)
        } catch (error) {
            console.log(error)
        }
        const addChildElement = (container) => {
            if (container.compId === compId) {
                try {
                    const component = JSON.parse(item)
                    console.log(component, 'item')
                    const order = container.children?.length
                        ? container.children[container.children.length - 1].order + 1
                        : 1
                    component.compId = uuidv4()
                    component.order = order

                    container?.children.push(component)
                } catch (error) {
                    console.log(error)
                }
            } else if (container.children) {
                container.children = container.children.map((child) => addChildElement(child))
            }
            return container
        }
        const afterAddingElement = siteContent.map((element) => addChildElement(element))
        const updatedSiteContent = deleteElementFromSiteContent(component?.compId, afterAddingElement)

        // Update the state with the new data
        updateSiteContent(updatedSiteContent)

        setElementOverContainer(null)
    }

    const handleContainerDragOver = (e, id) => {
        e.preventDefault()
        setElementOverContainer(id)
    }

    const updateProperties = (compId, updates) => {
        const updateState = (element) => {
            if (element.compId === compId) {
                // If the object is found, update its properties
                element = { ...element, ...updates }
                setSelectedComponent({ ...element })
            } else if (element.children) {
                // If the object has children, recursively search and update
                element.children = element.children.map((child) => updateState(child))
            }
            return element
        }

        // Update the state with the new data
        const updatedSiteContent = siteContent.map((element) => updateState(element))
        updateSiteContent(updatedSiteContent)
    }

    // tabs

    const handleTabUIDrop = (e, comp) => {
        e.preventDefault()
        const item = e.dataTransfer.getData('text/plain')
        const compId = comp?.compId
        let component = {}
        try {
            component = JSON.parse(item)
        } catch (error) {
            console.log(error)
        }
        const addChildElement = (tabUI) => {
            if (tabUI.compId === compId) {
                try {
                    const component = JSON.parse(item)
                    console.log(component, 'item')
                    // const order = tabUI.children?.length
                    //     ? tabUI.children[tabUI.children.length - 1].order + 1
                    //     : 1
                    component.compId = uuidv4()
                    // component.order = order
                    tabUI?.children.push(component)
                } catch (error) {
                    console.log(error)
                }
            } else if (tabUI.children) {
                tabUI.children = tabUI.children.map((child) => addChildElement(child))
            }
            return tabUI
        }
        const afterAddingElement = siteContent.map((element) => addChildElement(element))
        const updatedSiteContent = deleteElementFromSiteContent(component?.compId, afterAddingElement)

        // Update the state with the new data
        updateSiteContent(updatedSiteContent)

        setElementOverTabUI(null)
    }

    const handleTabUIDragOver = (e, id) => {
        e.preventDefault()
        setElementOverTabUI(id)
    }

    // Context Menu copy/past
    const updateAllElementsCompIDs = (copiedElementObj) => {
        function deepClone(original) {
            return JSON.parse(JSON.stringify(original))
        }

        // Recursively update compId for an object and its children
        function updateCompIdsRecursive(obj) {
            if (obj.compId) {
                obj.compId = uuidv4()
            }

            if (obj.children && obj.children.length > 0) {
                obj.children = obj.children.map(updateCompIdsRecursive)
            }

            return obj
        }

        return updateCompIdsRecursive(copiedElementObj)
    }
    const [copiedElement, setCopiedElement] = useState(null)
    const handelOnCopy = (copiedElementObj) => {
        // console.log(copiedElementObj, 'copiedElementObj')
        setCopiedElement(copiedElementObj)
    }

    const handelOnPast = () => {
        if (copiedElement?.compId) {
            console.log('copiedEle', copiedElement)
            const updatedElement = updateAllElementsCompIDs(structuredClone(copiedElement))
            console.log('copiedEle', updatedElement)

            if (updatedElement?.compId) {
                const updateState = (element) => {
                    if (element.compId === selectedComponent?.compId) {
                        // If the object is found, update its properties
                        element.children?.push(updatedElement)
                    } else if (element.children) {
                        // If the object has children, recursively search and update
                        element.children = element.children.map((child) => updateState(child))
                    }
                    return element
                }

                // Update the state with the new data
                const updatedSiteContent = siteContent.map((element) => updateState(element))
                updateSiteContent(updatedSiteContent)
            }
        }
    }

    // Builder page zoom
    const [zoomLevel, setZoomLevel] = useState(1)

    const handleZoom = (delta) => {
        setZoomLevel((prevZoom) => Math.max(0.1, prevZoom + delta))
    }

    const handleKeyPress = (event) => {
        if (event.altKey) {
            if (event.key === '+' || event.key === '-') {
                event.preventDefault() // Prevent browser zoom
                handleZoom(event.key === '+' ? 0.1 : -0.1)
            } else if (event.key === 'r') {
                setZoomLevel(1)
            }
        }
    }

    const handleWheel = (event) => {
        if (event.altKey) {
            event.preventDefault() // Prevent browser zoom
            const delta = event.deltaY > 0 ? -0.1 : 0.1
            handleZoom(delta)
        } else if (event.key === 'r') {
            setZoomLevel(1)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        window.addEventListener('wheel', handleWheel)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <>
            <div className=' fixed  left-[204px] right-[244px]   ' style={{ top: TOP_BAR_HEIGHT + 'px' }}>
                {/* Calculate width nd height */}
                <div
                    className=' overflow-auto flex flex-col flex-nowrap component-bar bg-white relative pb-40 w-[1036px] h-screen'
                    style={{ width: builderAreaWidth + 'px' }}>
                    <div
                        className=' pt-10 bg-[#fafafa] flex-grow grid h-max w-max overflow-visible pb-4 min-w-full'
                        style={{
                            zoom: zoomLevel,
                        }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                        <div className=' max-w-[90rem] mx-auto '>
                            <div className='     '>
                                {siteContent?.map((comp) =>
                                    RecursiveEditorElements(
                                        comp,
                                        setSelectedComponent,
                                        handleListDragStart,
                                        handleListDragOver,
                                        handleListDrop,
                                        selectedComponent,
                                        onContextMenuHandler,
                                        handleContainerDragOver,
                                        handleContainerDrop,
                                        setElementOverContainer,
                                        handleTabUIDragOver,
                                        handleTabUIDrop,
                                        setElementOverTabUI,
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedElement ? (
                <ContextMenu
                    contextMenuPoints={contextMenuPoints}
                    deleteElementHandler={deleteElementHandler}
                    editElementHandler={(comp) => setSelectedComponent(comp)}
                    selectedElement={selectedElement}
                    handelOnCopy={(comp) => handelOnCopy(comp)}
                    handelOnPast={handelOnPast}
                    closeContextMenu={() => {
                        setSelectedElement('')
                        setContextMenuPoints({})
                    }}
                />
            ) : null}
            {selectedComponent?.compId ? (
                <EditComponent
                    selectedComponent={selectedComponent}
                    siteContent={siteContent}
                    clearSelect={clearSelect}
                    key={selectedComponent?.hash || selectedComponent?.compId}
                    updateProperties={updateProperties}
                />
            ) : null}
            <div className=' fixed bottom-5  left-64 z-[1000]'>
                <div className=' h-[37px] w-[104px] select-none flex items-center justify-between p-2 rounded border-[1px] bg-white border-mediumGary'>
                    <div className=' cursor-pointer' onClick={() => handleZoom(-0.1)}>
                        <svg
                            width='20'
                            height='21'
                            viewBox='0 0 20 21'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M5 10.5H15'
                                stroke='#646464'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                    <div>
                        <p className=' text-xs text-almostBlack font-semibold'>
                            {Math.floor(zoomLevel * 100)}%
                        </p>
                    </div>
                    <div className=' cursor-pointer' onClick={() => handleZoom(0.1)}>
                        <svg
                            width='20'
                            height='21'
                            viewBox='0 0 20 21'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M5 10.5H10M10 10.5H15M10 10.5V15.75M10 10.5V5.25'
                                stroke='#646464'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuildArea
