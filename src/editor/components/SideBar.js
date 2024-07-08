import React from 'react'
import { COMPONENT_BAR_WIDTH, SIDE_TOOLBAR_WIDTH, TOP_BAR_HEIGHT } from '../../constants'

const SideBar = ({
    activeTab,
    searchInputHandler,
    searchValue,
    searchBasedCompList,
    tabs,
    handleDragStart,
}) => {
    return (
        <div
            className=' float-left  fixed bg-almostBlack/75 h-full z-[100]'
            style={{ top: TOP_BAR_HEIGHT + 'px' }}>
            <div className=' shrink-0 flex  h-full   '>
                {activeTab === tabs.COMPONENTS ? (
                    <div
                        className='  border-r-[1px] border-r-borderGray pt-3'
                        style={{ width: COMPONENT_BAR_WIDTH + 'px' }}>
                        {/* <p className=' text-xs text-white font-bold uppercase px-3'>Components</p> */}
                        <div className=' flex items-center rounded border-[1px] bg-white border-mediumGary mx-3 p-2 space-x-2 mt-2'>
                            <div>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    className=' text-secondaryColor'>
                                    <path
                                        d='M10 10L14 14M6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                            <input
                                type='text'
                                value={searchValue}
                                onChange={searchInputHandler}
                                className=' outline-none w-full placeholder:text-xs placeholder:text-secondaryColor placeholder:font-normal placeholder:mb-1'
                                placeholder='Search components'
                            />
                        </div>
                        <div className=' py-4 px-1  overflow-y-auto h-full  pb-40 component-bar'>
                            <div className='grid grid-cols-2 gap-x-[18px] gap-y-5 px-3'>
                                {searchBasedCompList?.map((component, index) => {
                                    return (
                                        <div
                                            key={index}
                                            draggable='true'
                                            onDragStart={(e) => handleDragStart(e, JSON.stringify(component))}
                                            className=' cursor-pointer'>
                                            <div className=' w-[75px] h-[75px] rounded'>
                                                <img
                                                    src={component.icon}
                                                    alt={component.name}
                                                    className=' w-full h-full'
                                                />
                                            </div>
                                            <p className=' pt-1 text-[10px] uppercase text-center text-white font-normal'>
                                                {component.name}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default SideBar
