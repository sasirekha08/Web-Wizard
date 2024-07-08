import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeToast } from './toastSlice'
import { motion } from 'framer-motion'

const Toast = () => {
    const dispatch = useDispatch()
    const { visible, message, type } = useSelector((state) => state.toastify)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(closeToast())
        }, 2000)

        return () => clearTimeout(timeoutId)
    }, [dispatch])

    const closeToastHandel = () => {
        dispatch(closeToast())
    }

    return (
        <div className=' fixed bottom-9 left-0 right-0 w-full flex justify-center'>
            <motion.div
                initial={{ y: 400, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 400, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.7 }}
                className=' py-2 px-5 bg-[#171717] h-[32px] min-w-[150px]  rounded cursor-pointer'
                onClick={closeToastHandel}>
                <p className=' text-xs text-white font-semibold'>{message}</p>
            </motion.div>
        </div>
    )
}

export default Toast
