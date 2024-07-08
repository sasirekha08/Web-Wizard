import { useState } from 'react'
// import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import BuildArea from './components/BuildArea'
import SaveComponent from './components/SaveComponent'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import componentsList, { componentsListDummy } from '../componentList'
import './ComponentBar.css'
import { openToast } from '../uiComponents/toastify/toastSlice'
import Header from '../uiComponents/header/Header'
import SideBar from './components/SideBar'
import { COMPONENT_BAR_WIDTH, RIGHT_EDIT_COMPONENT_BAR } from '../constants'
const Editor = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(params)

    const allComponentsData = JSON.parse(localStorage.getItem('allComponentsData'))

    const [componentData, setComponentData] = useState([])
    useEffect(() => {
        if (Array.isArray(allComponentsData)) {
            const filteredData = allComponentsData.find((data) => data.id === params?.componentId)
            setSiteContent(filteredData ? filteredData.content : null)
            setComponentData(filteredData ? filteredData : null)
        } else {
            dispatch(openToast({ message: 'Error fetching data', type: 'error' }))
        }
    }, [params?.componentId])

    const [siteContent, setSiteContent] = useState([])
    const [selectedComponent, setSelectedComponent] = useState(null)
    const syncSelectedComponent = (updatedSiteContent) => {
        if (selectedComponent?.compId) {
            const updateState = (element) => {
                if (element.compId === selectedComponent?.compId) {
                    // If the object is found, update its properties
                    element.hash = uuidv4()
                    setSelectedComponent(structuredClone(element))
                    return
                } else if (element.children) {
                    // If the object has children, recursively search and update
                    element.children = element.children.map((child) => updateState(child))
                }
            }
            // Update the state with the new data
            updatedSiteContent.map((element) => updateState(element))
        }
    }
    console.log('edotp', selectedComponent)

    const [isSaveModalOpen, setIsSaveModalOpen] = useState()
    const saveTemplateHandler = () => {
        try {
            if (params?.componentId) {
                const index = allComponentsData.findIndex((obj) => obj.id === params?.componentId)

                if (index !== -1) {
                    const modifiedAllCompData = [...allComponentsData]
                    modifiedAllCompData[index] = { ...allComponentsData[index], content: siteContent }

                    localStorage.setItem('allComponentsData', JSON.stringify(modifiedAllCompData))
                    dispatch(openToast({ message: 'Component successfully saved', type: 'success' }))
                }
            }
        } catch (error) {
            console.error('Error saving component:', error)
            dispatch(openToast({ message: 'Error while saving component', type: 'error' }))
        }
    }
    const closeSaveModalHandler = () => {
        setIsSaveModalOpen(false)
    }
    // left tab bar
    const tabs = {
        HOME: 'home',
        COMPONENTS: 'components',
        LAYERS: 'layers',
        SEARCH: 'search',
        SETTINGS: 'settings',
    }
    const [activeTab, setActiveTab] = useState(tabs.COMPONENTS)

    const [builderAreaWidth, setBuilderAreaWidth] = useState(0)
    useEffect(() => {
        let calculateBuilderAreaWidth = 0
        if (selectedComponent?.compId) {
            calculateBuilderAreaWidth = window.innerWidth - COMPONENT_BAR_WIDTH - RIGHT_EDIT_COMPONENT_BAR
        } else {
            calculateBuilderAreaWidth = window.innerWidth - COMPONENT_BAR_WIDTH
        }
        setBuilderAreaWidth(calculateBuilderAreaWidth)
    }, [selectedComponent?.compId])

    const handleDragStart = (e, component) => {
        e.dataTransfer.setData('text/plain', component)
    }

    // Undo/redo
    const undoStackKey = `undoStack_${params?.componentId}`
    const forthUndoKey = 'forthUndo'
    useEffect(() => {
        localStorage.removeItem(undoStackKey)
        localStorage.removeItem(forthUndoKey)
        return () => {
            localStorage.removeItem(undoStackKey)
            localStorage.removeItem(forthUndoKey)
        }
    }, [undoStackKey])
    const storeData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new Event('storage'))
    }

    const retrieveData = (key) => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : null
    }
    const [undoHistoryLength, setUndoHistoryLength] = useState(0)
    const [redoHistoryLength, setRedoHistoryLength] = useState(0)

    // Add an item to the data array
    const updateSiteContent = (updatedSiteContent) => {
        const undoStackData = retrieveData(undoStackKey)
        if (!undoStackData) {
            storeData(undoStackKey, { undo: [updatedSiteContent], redo: [] })
            storeData(forthUndoKey, { data: componentData?.content })
        } else {
            const lastForeUndo = undoStackData.undo.slice(-4)
            if (lastForeUndo?.length === 4) {
                storeData(forthUndoKey, { data: lastForeUndo[0] })
            }
            setUndoHistoryLength(undoStackData.undo.slice(-3)?.length + 1)
            undoStackData.undo = [...undoStackData.undo.slice(-3), updatedSiteContent]
            undoStackData.redo = [] // Clear redo history when a new item is added
            storeData(undoStackKey, undoStackData)
        }
        setSiteContent(structuredClone(updatedSiteContent))
    }

    // Undo action
    const undo = () => {
        const undoStackData = retrieveData(undoStackKey)
        if (undoStackData?.undo?.length > 0) {
            let prevData = undoStackData?.undo[undoStackData?.undo.length - 2]
            if (!prevData) {
                prevData = retrieveData(forthUndoKey)?.data
            }
            syncSelectedComponent(structuredClone(prevData))
            setSiteContent(structuredClone(prevData))
            storeData(undoStackKey, {
                undo: [...undoStackData?.undo.slice(0, -1)],
                redo: [siteContent, ...undoStackData?.redo],
            })
        }
    }

    // Redo action
    const redo = () => {
        const undoStackData = retrieveData(undoStackKey)
        if (undoStackData?.redo?.length > 0) {
            let nextData = undoStackData?.redo[0]
            syncSelectedComponent(structuredClone(nextData))
            setSiteContent(structuredClone(nextData))
            storeData(undoStackKey, {
                undo: [...undoStackData?.undo, nextData],
                redo: [...undoStackData?.redo?.slice(1)],
            })
        }
    }

    const [searchValue, setSearchValue] = useState('')
    const [searchBasedCompList, setSearchBasedCompList] = useState(componentsList)
    const searchInputHandler = (e) => {
        let value = e.target.value.trim()
        setSearchValue(value)
        if (value?.length > 0) {
            const filteredCompList = componentsList?.filter((data) =>
                data.name?.toLowerCase().includes(value.toLowerCase()),
            )
            setSearchBasedCompList(filteredCompList)
            console.log('filteredCompList', filteredCompList)
        } else {
            setSearchBasedCompList(componentsList)
        }
        console.log('serachvakue', value)
    }
    useEffect(() => {
        // Function to handle changes in localStorage
        const handleStorageChange = () => {
            const undoStack = retrieveData(undoStackKey)
            setRedoHistoryLength(undoStack?.redo?.length)
            setUndoHistoryLength(undoStack?.undo?.length)
        }
        // Add event listener when the component mounts
        window.addEventListener('storage', handleStorageChange)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, []) // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <>
            <div className='   '>
                <Header
                    componentData={componentData}
                    saveTemplateHandler={saveTemplateHandler}
                    page='editor'
                    redo={redo}
                    undo={undo}
                    undoHistoryLength={undoHistoryLength}
                    redoHistoryLength={redoHistoryLength}
                />
                <SideBar
                    activeTab={activeTab}
                    // handelTabChange={handelTabChange}
                    searchInputHandler={searchInputHandler}
                    searchValue={searchValue}
                    searchBasedCompList={searchBasedCompList}
                    handleDragStart={handleDragStart}
                    tabs={tabs}
                />

                <BuildArea
                    siteContent={siteContent}
                    updateSiteContent={updateSiteContent}
                    selectedComponent={selectedComponent}
                    setSelectedComponent={setSelectedComponent}
                    builderAreaWidth={builderAreaWidth}
                />
            </div>
            {isSaveModalOpen ? (
                <SaveComponent closeSaveModalHandler={closeSaveModalHandler} siteContent={siteContent} />
            ) : null}
        </>
    )
}

export default Editor
