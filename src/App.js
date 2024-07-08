import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

import Editor from './editor/Editor'
import Preview from './preview/Preview'
import ListComponents from './listComponents/ListComponents'
import 'react-toastify/dist/ReactToastify.css'
import Toast from './uiComponents/toastify/Toast'
import sampleWebsiteJSON from './sampleWebsiteJSON'
import { useEffect } from 'react'

function App() {
    // useGetActiveProductTemplate()
    const { visible, message } = useSelector((state) => state.toastify)

    useEffect(() => {
        console.log('sample', sampleWebsiteJSON)

        let allComponentsData = []
        allComponentsData.push(sampleWebsiteJSON)
        console.log('sample array', allComponentsData)
        if (!localStorage.getItem('allComponentData')) {
            localStorage.setItem('allComponentsData', JSON.stringify(allComponentsData))
        }
    }, [])

    return (
        <section>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<ListComponents />} />
                <Route path='/editor/:componentId' element={<Editor />} />
                <Route path='preview/:componentId' element={<Preview />} />
            </Routes>
            <AnimatePresence>{visible ? <Toast key={message} /> : null}</AnimatePresence>
        </section>
    )
}

export default App
