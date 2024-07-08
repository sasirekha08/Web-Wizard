import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

const TabContent = ({ updateProperties, selectedComponent }) => {
    // Tabs
    const [isTabModalOpen, setIsTabModalOpen] = useState(false)
    const [tabToEdit, setTabToEdit] = useState(null)
    const handelTabModalOpen = (tab) => {
        setIsTabModalOpen(true)
        setTabToEdit(tab)
    }
    const handelTabModalClose = () => {
        setIsTabModalOpen(false)
        setTabToEdit(null)
    }

    const addNewTabOption = (tabName) => {
        const newTabOption = {
            type: 'tab',
            compId: uuidv4(),
            name: tabName,
            children: [],
        }
        updateProperties(selectedComponent?.compId, {
            children: [...selectedComponent?.children, newTabOption],
        })
        setIsTabModalOpen(false)
        setTabToEdit(null)
    }
    const editTabOption = (tabName, compId) => {
        let tabOptionsArr = selectedComponent?.children?.slice()
        tabOptionsArr = tabOptionsArr.map((opt) => {
            if (opt?.compId === compId) opt.name = tabName
            return opt
        })
        updateProperties(selectedComponent?.compId, { children: tabOptionsArr })
        setIsTabModalOpen(false)
        setTabToEdit(null)
    }
    const deleteTabOption = (compId) => {
        let tabOptionsArr = selectedComponent?.children?.slice()
        tabOptionsArr = tabOptionsArr.filter((opt) => {
            return opt?.compId !== compId
        })
        updateProperties(selectedComponent?.compId, { children: tabOptionsArr })
        setIsTabModalOpen(false)
        setTabToEdit(null)
    }

    //Layout Option
    const layoutTypes = ['stacked', 'inline']
    const [selectedLayout, setSelectedLayout] = useState(selectedComponent?.layout || '')
    const handleLayoutChange = (e) => {
        const option = e.target.value
        setSelectedLayout(option)
        updateProperties(selectedComponent?.compId, { layout: option })
    }

    return (
        <>
            <div className='w-full p-2'>
                <div className=' flex justify-between mb-2 items-center'>
                    <p className='font-medium leading-3 text-subItemGray text-xs'>Tabs</p>
                    <svg
                        onClick={() => handelTabModalOpen()}
                        className='cursor-pointer'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M6 12H12M12 12H18M12 12V18M12 12V6'
                            stroke='#989898'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
                <div className='rounded border overflow-hidden  border-[#989898] '>
                    {selectedComponent?.children?.map((tabOptions) => {
                        return (
                            <div
                                key={tabOptions?.compId}
                                onClick={() =>
                                    handelTabModalOpen({
                                        compId: tabOptions?.compId,
                                        name: tabOptions?.name,
                                    })
                                }
                                className=' flex justify-between p-2 cursor-pointer hover:bg-gray-100 items-center '>
                                <div className='flex items-center space-x-2'>
                                    {tabToEdit?.compId === tabOptions?.compId ? (
                                        <svg
                                            className='shrink-0'
                                            width='12'
                                            height='12'
                                            viewBox='0 0 12 12'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <circle cx='6' cy='6' r='6' fill='#525252' />
                                        </svg>
                                    ) : (
                                        <svg
                                            className='shrink-0'
                                            width='12'
                                            height='12'
                                            viewBox='0 0 12 12'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <circle cx='6' cy='6' r='5.5' stroke='#525252' />
                                        </svg>
                                    )}
                                    <p className='font-semibold leading-3 text-almostBlack text-xs'>
                                        {tabOptions?.name}
                                    </p>
                                </div>
                                <div className=' flex items-center gap-x-5'>
                                    <svg
                                        className=' cursor-pointer shrink-0'
                                        width='10'
                                        height='10'
                                        viewBox='0 0 10 10'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M1 7.00006V9.00006L3 9.00005L8.43431 3.56573L8.43475 3.56531C8.63248 3.36758 8.73138 3.26868 8.76844 3.1546C8.80107 3.05418 8.80108 2.946 8.76845 2.84558C8.73136 2.73142 8.63231 2.63237 8.4343 2.43436L7.5644 1.56446C7.36724 1.3673 7.26846 1.26852 7.15454 1.2315C7.05412 1.19887 6.94594 1.19887 6.84551 1.2315C6.73151 1.26854 6.63262 1.36744 6.43518 1.56488L6.43431 1.56573L1 7.00006Z'
                                            stroke='#9CA3AF'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* <div className='mt-2  space-y-1'>
                <p>Layout Type</p>
                <select
                    value={selectedLayout}
                    onChange={handleLayoutChange}
                    className=' w-full p-1 rounded capitalize'>
                    {layoutTypes?.map((type) => {
                        return (
                            <option value={type} className='capitalize'>
                                {type}
                            </option>
                        )
                    })}
                </select>
            </div> */}

            {isTabModalOpen ? (
                <EditTabOptions
                    selectedTab={tabToEdit}
                    handelTabModalClose={handelTabModalClose}
                    addNewTabOption={addNewTabOption}
                    editTabOption={editTabOption}
                    deleteTabOption={deleteTabOption}
                />
            ) : null}
        </>
    )
}

export default TabContent

const EditTabOptions = ({
    selectedTab,
    handelTabModalClose,
    addNewTabOption,
    editTabOption,
    deleteTabOption,
}) => {
    const [tabName, setTabName] = useState(selectedTab?.name || '')
    const handelSaveTabOption = () => {
        if (selectedTab?.compId) {
            editTabOption(tabName, selectedTab?.compId)
        } else {
            addNewTabOption(tabName)
        }
    }
    return (
        <section className='fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-30'>
            <div className='bg-white border border-[#989898] right-[18rem] p-4 absolute top-40  max-w-[255px] w-full 2xl:top-auto rounded overflow-hidden'>
                <div>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='font-semibold leading-3 text-almostBlack text-xs'>Add Tab</p>
                        <svg
                            className='cursor-pointer'
                            onClick={handelTabModalClose}
                            width='10'
                            height='10'
                            viewBox='0 0 10 10'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M8.33315 8.33332L4.99985 5.00001M4.99985 5.00001L1.6665 1.66667M4.99985 5.00001L8.33319 1.66667M4.99985 5.00001L1.6665 8.33336'
                                stroke='#9CA3AF'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </div>
                    <label htmlFor='tab-name' className='font-medium leading-6 text-subItemGray text-xs'>
                        Tab Name
                    </label>
                    <input
                        type='text'
                        placeholder=''
                        value={tabName}
                        onChange={(e) => setTabName(e.target.value)}
                        className='rounded text-xs w-full font-semibold bg-[#F2F2F2] text-almostBlack p-2  outline-none'
                    />
                </div>
                <div className=' mt-8 flex justify-end'>
                    <button
                        className='px-3 py-1.5 rounded-[4px] font-bold bg-primaryColor text-xs text-almostBlack'
                        onClick={handelSaveTabOption}>
                        Save
                    </button>
                    <button
                        className='pl-3 py-1.5  font-bold  text-deleteRed text-xs'
                        onClick={() => deleteTabOption(selectedTab?.compId)}>
                        Delete
                    </button>
                </div>
            </div>
        </section>
    )
}
