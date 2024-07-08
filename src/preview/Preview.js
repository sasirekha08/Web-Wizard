import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'

// Components

import RecursiveElements from './components/RecursiveElements'
import { openToast } from '../uiComponents/toastify/toastSlice'

const Preview = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const allComponentsData = JSON.parse(localStorage.getItem('allComponentsData'))

    const [componentData, setComponentData] = useState([])
    useEffect(() => {
        if (Array.isArray(allComponentsData)) {
            const filteredData = allComponentsData.find((data) => data.id === params?.componentId)
            setComponentData(filteredData ? filteredData : null)
        } else {
            dispatch(openToast({ message: 'Error previewing data', type: 'error' }))
        }
    }, [params?.componentId])

    console.log('Preview', componentData)

    return (
        <div>
            {componentData?.content?.length > 0 ? (
                <>
                    <div>
                        <div className=''>
                            {componentData?.content?.map((data) => RecursiveElements(data))}
                        </div>
                    </div>
                </>
            ) : (
                <p className='text-gray-500 text-center mt-20'>Preview currently not available</p>
            )}
        </div>
    )
}

export default Preview
