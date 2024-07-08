import React from 'react'
import { Link } from 'react-router-dom'
import { FaUndo, FaRedo } from 'react-icons/fa'
import { TOP_BAR_HEIGHT } from '../../constants'

const Header = ({
    componentData,
    saveTemplateHandler,
    page,
    redo,
    undo,
    undoHistoryLength,
    redoHistoryLength,
}) => {
    console.log('Header COmponent Data', componentData)
    return (
        <div
            className=' w-full  fixed overflow-hidden bg-secondaryColor px-4 z-[100] flex justify-between items-center  border-b'
            style={{ height: TOP_BAR_HEIGHT + 'px' }}>
            <div className=' flex items-end gap-x-2'>
                {/* <div className=' w-[94px] h-[30px]'>
                    <img src={Logo} alt='' className=' w-full h-full' />
                </div> */}
                <Link to='/'>
                    <p className=' text-xl text-primaryColor uppercase'>
                        <span className='text-white font-bold '>Web</span> Craft
                    </p>
                </Link>
            </div>
            {page === 'editor' ? (
                <>
                    <p className=' text-sm text-white font-semibold uppercase'>{componentData?.name}</p>
                    <div className=' flex items-center gap-x-4'>
                        <div className=' flex items-center space-x-3'>
                            <FaUndo
                                className={`  select-none ${
                                    undoHistoryLength > 0
                                        ? 'cursor-pointer text-primaryColor'
                                        : ' cursor-auto text-white'
                                }`}
                                onClick={undo}
                            />
                            <FaRedo
                                className={` select-none  ${
                                    redoHistoryLength > 0
                                        ? 'cursor-pointer text-primaryColor'
                                        : ' cursor-auto text-white'
                                }`}
                                onClick={redo}
                            />
                        </div>
                        <button
                            className=' py-2 text-black text-xs px-4 uppercase font-bold bg-primaryColor'
                            onClick={saveTemplateHandler}>
                            Save
                        </button>
                        <Link to={`/preview/${componentData?.id}`} target='_blank' rel='noopener noreferrer'>
                            <button className=' py-2 text-white text-xs px-4 uppercase font-bold border border-white'>
                                Preview
                            </button>
                        </Link>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Header
