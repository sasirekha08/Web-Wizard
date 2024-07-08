import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openToast } from '../../uiComponents/toastify/toastSlice'
import { v4 as uuidv4 } from 'uuid'
// import { toast } from 'react-toastify'

const SaveComponent = ({ closeSaveModalHandler, siteContent, saveModalTitle }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [componentName, setComponentName] = useState('')
    const saveComponentHandler = () => {
        try {
            const data = {
                id: uuidv4(),
                name: componentName,
                content: siteContent,
            }

            const allComponentsData = JSON.parse(localStorage.getItem('allComponentsData')) || []
            allComponentsData.push(data)
            localStorage.setItem('allComponentsData', JSON.stringify(allComponentsData))
            navigate(`/editor/${data.id}`)
            dispatch(openToast({ message: 'Component successfully saved', type: 'success' }))
        } catch (error) {
            console.error('Error saving component:', error)
            dispatch(openToast({ message: 'Error while saving component', type: 'error' }))
        }
        // saveComponent(
        //     { data },
        //     {
        //         onSuccess: (data) => {
        //             navigate(`/editor/${data?.id}`)
        //             dispatch(openToast({ message: 'Created successfully', type: 'success' }))
        //         },
        //     },
        // )
    }
    return (
        <section className='fixed top-0 left-0 z-[201] flex h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
            <div className='bg-white p-4 absolute top-40  max-w-md w-full 2xl:top-auto rounded overflow-hidden'>
                <div className=' flex justify-between'>
                    <p className='font-bold'>{saveModalTitle}</p>
                    <MdClose className=' cursor-pointer' onClick={closeSaveModalHandler} />
                </div>
                <div className='mt-6 flex flex-col'>
                    <label className='block text-sm font-medium leading-6 text-gray-900 shrink-0 mb-2'>
                        Name
                    </label>
                    <input
                        type='text'
                        placeholder=''
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        // required={field.required}
                        className='block outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none bg-white  pr-[0.75rem] pl-[0.75rem]'
                    />
                </div>
                <div className='mt-4'>
                    <button
                        className='px-4 py-2 rounded-sm font-bold w-full bg-primaryColor text-black'
                        onClick={saveComponentHandler}>
                        Create
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SaveComponent
