import React from 'react'
import componentsList from '../../componentList'
import { Link } from 'react-router-dom'

const ComponentsBar = ({ saveTemplateHandler, componentId }) => {
    const handleDragStart = (e, component) => {
        e.dataTransfer.setData('text/plain', component)
    }

    return (
        <div className=' max-w-[10rem] w-full shrink-0 overflow-y-auto   top-0 bg-gray-100 '>
            <div className='flex flex-col h-full'>
                <p className=' pt-1 px-2 '>Components</p>
                <div className='flex flex-col h-full justify-between'>
                    <div className=' py-5 '>
                        {componentsList?.map((component, index) => {
                            return (
                                <div
                                    key={index}
                                    className=' flex py-2 px-2 border items-center cursor-move gap-x-2 text-gray-600'
                                    draggable='true'
                                    onDragStart={(e) => handleDragStart(e, JSON.stringify(component))}>
                                    <component.icon className='  text-xl' />
                                    <p>{component.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex flex-col gap-y-2 my-2 mx-2'>
                        <button
                            className='bg-blue-700 text-white p-2 w-full font-medium rounded-sm'
                            onClick={saveTemplateHandler}>
                            Save
                        </button>
                        <Link to={`/preview/${componentId}`} target='_blank' rel='noopener noreferrer'>
                            <button className='bg-gray-600 text-white p-2 w-full font-medium rounded-sm'>
                                Preview
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentsBar

