import React from 'react'

const ContextMenu = ({
    contextMenuPoints,
    editElementHandler,
    selectedElement,
    handelOnCopy,
    handelOnPast,
    deleteElementHandler,
    closeContextMenu,
}) => {
    return (
        <div className=' absolute top-0 bottom-0 left-0 right-0  z-[120]' onMouseDown={closeContextMenu}>
            <div
                className='bg-gray-50 border border-gray-300 rounded-sm shadow-sm absolute w-[90px] p-1'
                style={{ top: contextMenuPoints?.y, left: contextMenuPoints?.x }}>
                <ul className='w-full '>
                    <li
                        className='p-1 cursor-pointer hover:bg-gray-200'
                        onMouseDown={(e) => {
                            if (e.button === 0) {
                                e.stopPropagation()
                                editElementHandler(selectedElement)
                            }
                        }}>
                        Edit
                    </li>
                    <li
                        className='p-1 cursor-pointer hover:bg-gray-200'
                        onMouseDown={(e) => {
                            if (e.button === 0) {
                                e.stopPropagation()
                                handelOnCopy(selectedElement)
                            }
                        }}>
                        Copy
                    </li>
                    <li
                        className='p-1 cursor-pointer hover:bg-gray-200'
                        onMouseDown={(e) => {
                            if (e.button === 0) {
                                e.stopPropagation()
                                handelOnPast()
                            }
                        }}>
                        Past
                    </li>
                    <li
                        className='p-1 cursor-pointer hover:bg-gray-200'
                        onMouseDown={(e) => {
                            if (e.button === 0) {
                                e.stopPropagation()
                                deleteElementHandler()
                            }
                        }}>
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ContextMenu
