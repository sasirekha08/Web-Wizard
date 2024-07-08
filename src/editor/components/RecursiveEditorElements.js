import React, { Fragment } from 'react'
import { componentsTypes } from '../../componentList'
import EditorParagraph from '../../components/paragraph/EditorParagraph'
import EditorButton from '../../components/button/EditorButton'
import EditorContainer from '../../components/container/EditorContainer'
import EditorImage from '../../components/image/EditorImage'
import EditorVideo from '../../components/video/EditorVideo'
import EditorTabs from '../../components/tabs/EditorTabs'
import EditorGroupedContainer from '../../components/groupedContainer/EditorGroupedContainer'

function RecursiveEditorElements(
    elementData,
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
) {
    const { type, style, children, compId, apiDetails, text, placeholder, ...props } = elementData

    const stopEventPropagation = (event) => {
        event.stopPropagation()
    }
    switch (type) {
        case componentsTypes.CONTAINER:
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={(e) => {
                        stopEventPropagation(e)
                        handleContainerDragOver(e, compId)
                    }}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleContainerDrop(e, elementData)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        setElementOverContainer(null)
                    }}
                    className={`border   ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorContainer
                        component={elementData}
                        onContextMenuHandler={onContextMenuHandler}
                        style={style}>
                        {children &&
                            children?.map((child) => {
                                return (
                                    <Fragment key={child?.compId}>
                                        {RecursiveEditorElements(
                                            child,
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
                                        )}
                                    </Fragment>
                                )
                            })}
                    </EditorContainer>
                </div>
            )

        case componentsTypes.TEXT:
            return (
                <div
                    key={elementData?.compId}
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={handleListDragOver}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleListDrop(e, compId)
                    }}
                    className={`border  hover:border-red-500 ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorParagraph
                        component={elementData}
                        onContextMenuHandler={onContextMenuHandler}
                        text={apiDetails?.key || text || placeholder}
                        style={style}
                    />
                </div>
            )

        case componentsTypes.BUTTON:
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={handleListDragOver}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleListDrop(e, compId)
                    }}
                    className={`border  hover:border-red-500 ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorButton
                        component={elementData}
                        onContextMenuHandler={onContextMenuHandler}
                        text={text || placeholder}
                        style={style}
                    />
                </div>
            )
        case componentsTypes.IMAGE:
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={handleListDragOver}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleListDrop(e, compId)
                    }}
                    className={`border  hover:border-red-500 ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorImage component={elementData} onContextMenuHandler={onContextMenuHandler} />
                </div>
            )
        case componentsTypes.TAB_GROUP:
            const tabPage = (selectedTab) => {
                console.log('selectedTab', selectedTab)
                return (
                    <div
                        onDragOver={(e) => {
                            stopEventPropagation(e)
                            handleTabUIDragOver(e, selectedTab?.compId)
                        }}
                        onDrop={(e) => {
                            stopEventPropagation(e)
                            handleTabUIDrop(e, selectedTab)
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault()
                            setElementOverTabUI(null)
                        }}>
                        {selectedTab?.children?.length > 0 ? (
                            selectedTab?.children?.map((child) =>
                                RecursiveEditorElements(
                                    child,
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
                            )
                        ) : (
                            <div className=' w-full  py-24 border '>
                                <p className=' text-center'>Darg and drop tab specific UI elements </p>
                            </div>
                        )}
                    </div>
                )
            }
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    className={`border  hover:border-red-500 ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}
                    onContextMenu={(e) => {
                        e.stopPropagation()
                        onContextMenuHandler(e, elementData)
                    }}>
                    <EditorTabs component={elementData}>{tabPage}</EditorTabs>
                </div>
            )

        case componentsTypes.VIDEO:
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={handleListDragOver}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleListDrop(e, compId)
                    }}
                    className={`border  hover:border-red-500 ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorVideo component={elementData} onContextMenuHandler={onContextMenuHandler} />
                </div>
            )

        case componentsTypes.GROUPED_CONTAINER:
            return (
                <div
                    onClick={(e) => {
                        stopEventPropagation(e)
                        setSelectedComponent(elementData)
                    }}
                    key={compId}
                    draggable
                    onDragStart={(e) => {
                        stopEventPropagation(e)
                        handleListDragStart(e, elementData)
                    }}
                    onDragOver={(e) => {
                        stopEventPropagation(e)
                        handleContainerDragOver(e, compId)
                    }}
                    onDrop={(e) => {
                        stopEventPropagation(e)
                        handleContainerDrop(e, elementData)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        setElementOverContainer(null)
                    }}
                    className={`border   ${
                        compId === selectedComponent?.compId ? 'border-red-500' : 'border-transparent'
                    }`}>
                    <EditorGroupedContainer
                        component={elementData}
                        onContextMenuHandler={onContextMenuHandler}
                        style={style}>
                        {children &&
                            children?.map((child) => {
                                return (
                                    <Fragment key={child?.compId}>
                                        {RecursiveEditorElements(
                                            child,
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
                                        )}
                                    </Fragment>
                                )
                            })}
                    </EditorGroupedContainer>
                </div>
            )
        default:
            return null
    }
}

export default RecursiveEditorElements
