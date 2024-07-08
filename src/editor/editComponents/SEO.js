import { useState } from 'react'

const SEO = ({ selectedComponent, updateProperties }) => {
    const [SEOTitle, setSEOTitle] = useState(null)
    const handelSEOTitleChange = (e) => {
        const value = e.target.value
        setSEOTitle(value)
        const updatedSEO = { ...selectedComponent.seo, title: value }
        updateProperties(selectedComponent?.compId, { seo: updatedSEO })
    }
    
    const [pageDescription, setPageDescription] = useState(null)
    const handelPageDescriptionChange = (e) => {
        const value = e.target.value
        setPageDescription(value)
        const updatedSEO = { ...selectedComponent.seo, description: value }
        updateProperties(selectedComponent?.compId, { seo: updatedSEO })
    }

    const [keyWords, setKeyWords] = useState(null)
    const handelKeywordsChange = (e) => {
        const value = e.target.value
        setKeyWords(value)
        const updatedSEO = { ...selectedComponent.seo, keyWords: value }
        updateProperties(selectedComponent?.compId, { seo: updatedSEO })
    }
    return (
        <div className=''>
            <div className='mt-4'>
                <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                    Title
                </label>
                <textarea
                    type='text'
                    className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack  outline-none text-xs'
                    value={SEOTitle}
                    onChange={handelSEOTitleChange}
                />
            </div>
            <div className='mt-4'>
                <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                Page Description
                </label>
                <textarea
                    type='text'
                    className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack  outline-none text-xs'
                    value={pageDescription}
                    onChange={handelPageDescriptionChange}
                />
            </div>
            <div className='mt-4'>
                <label className='text-xs text-subItemGray font-medium block leading-3 mb-3  shrink-0'>
                Keywords
                </label>
                <textarea
                    type='text'
                    className=' w-full font-semibold p-2 rounded bg-[#F2F2F2] text-almostBlack  outline-none text-xs'
                    value={keyWords}
                    onChange={handelKeywordsChange}
                />
            </div>
        </div>
    )
}

export default SEO
