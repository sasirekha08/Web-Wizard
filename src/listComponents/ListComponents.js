import React, { useState } from 'react'
// import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import SaveComponent from '../editor/components/SaveComponent'
import { openToast } from '../uiComponents/toastify/toastSlice'
import Header from '../uiComponents/header/Header'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { HiOutlineDuplicate } from 'react-icons/hi'
const ListComponents = () => {
    const dispatch = useDispatch()

    const [isSaveModalOpen, setIsSaveModalOpen] = useState()
    const [componentSiteContent, setComponentSiteContent] = useState([])
    const [saveModalTitle, setSaveModalTitle] = useState(null)
    const [allComponentsLsData, setAllComponentsLsData] = useState(
        JSON.parse(localStorage.getItem('allComponentsData')) || [],
    )

    console.log('ALL COMPONENTS LS DATA', allComponentsLsData)
    const handelDeleteComponent = (componentId) => {
        try {
            const componentsAfterDel = allComponentsLsData.filter((data) => data.id !== componentId)
            setAllComponentsLsData(componentsAfterDel)
            localStorage.setItem('allComponentsData', JSON.stringify(componentsAfterDel))
            dispatch(openToast({ message: 'Component successfully deleted', type: 'success' }))
        } catch (error) {
            console.error('Error deleting component:', error)
            dispatch(openToast({ message: 'Error while deleting component', type: 'error' }))
        }
    }

    const cloneComponent = (component, modalTitle) => {
        setComponentSiteContent(component?.content)
        setIsSaveModalOpen(true)
        setSaveModalTitle(modalTitle)
    }

    const createNewComponent = (modalTitle) => {
        setIsSaveModalOpen(true)
        setSaveModalTitle(modalTitle)
    }

    const closeSaveModalHandler = () => {
        setIsSaveModalOpen(false)
        setComponentSiteContent([])
        setSaveModalTitle(null)
    }
    return (
        <section className=' min-h-screen bg-[#f0f0f0]'>
            <Header />
            <div className='pt-32 pb-24 max-w-4xl mx-auto'>
                <div className='text-right pr-2'>
                    <button
                        onClick={() => createNewComponent('Create new web page')}
                        className='bg-primaryColor uppercase text-almostBlack text-xs font-semibold px-4 py-2'>
                        <div className='flex space-x-1 items-center'>
                            <MdAdd className='text-xl ' />
                            <span>Create custom web pages</span>
                        </div>
                    </button>
                </div>
                <div className='mt-16 grid md:grid-cols-2 justify-items-center gap-x-12 gap-y-8'>
                    {allComponentsLsData?.map((component) => {
                        return (
                            <div className='flex flex-col w-[350px] ' key={component?.id}>
                                <div className='flex justify-between items-center mt-2 px-4 py-6 bg-almostBlack/75 shadow-md '>
                                    <p className='text-sm font-semibold text-white uppercase'>
                                        {component?.name}
                                    </p>
                                    <div className='flex space-x-3'>
                                        <Link to={`/editor/${component?.id}`}>
                                            <MdOutlineEdit className='text-xl text-primaryColor' />
                                        </Link>
                                        <HiOutlineDuplicate
                                            className='text-xl cursor-pointer text-primaryColor'
                                            onClick={() => cloneComponent(component, 'Duplicate component')}
                                        />

                                        {component?.id !== 'ceda88c8-cedb-4a5d-b870-837f6016hv2e' ? (
                                            <AiOutlineDelete
                                                className='text-xl cursor-pointer text-primaryColor'
                                                onClick={() => handelDeleteComponent(component?.id)}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {isSaveModalOpen ? (
                <SaveComponent
                    closeSaveModalHandler={closeSaveModalHandler}
                    siteContent={componentSiteContent}
                    saveModalTitle={saveModalTitle}
                />
            ) : null}
        </section>
    )
}

export default ListComponents
