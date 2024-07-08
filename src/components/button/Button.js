import React from 'react'
import { buttonFunctionTypes } from '../../componentList'
import { Link } from 'react-router-dom'

const Button = ({ style, content, eventHandler }) => {
    // const { data: coursesData, error: coursesError, status: courseStatus, refetch} = useGetCourses()

    return (
        <>
            {eventHandler?.type === buttonFunctionTypes?.ADD_ROUTES ? (
                <Link to={`/${eventHandler?.eventValue}`}>
                    <button style={style}>{content}</button>
                </Link>
            ) : eventHandler?.type === buttonFunctionTypes?.CALL_API ? (
                <button style={style} className=' w-full'>
                    {content}
                </button>
            ) : (
                <button style={style} className=' w-full'>
                    {content}
                </button>
            )}
        </>
    )
}

export default Button
