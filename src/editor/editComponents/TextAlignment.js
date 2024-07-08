import React from 'react'

const TextAlignment = ({ selectedComponent, updateProperties }) => {
    const alignment = selectedComponent?.style?.textAlign
    const handelAlignmentChange = (alignment) => {
        const updatedStyle = { ...selectedComponent.style, textAlign: alignment }
        updateProperties(selectedComponent?.compId, { style: updatedStyle })
    }
    return (
        <div className=' flex justify-between items-center'>
            <p className=' text-xs font-medium text-subItemGray'>Alignment</p>
            <div className=' flex items-center justify-between w-[137px] h-[32px] bg-bgGray rounded  px-2 py-3'>
                <div onClick={() => handelAlignmentChange('left')} className=' cursor-pointer select-none'>
                    <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`${alignment === 'left' ? 'text-[#323232]' : 'text-[#999999]'} `}>
                        <path
                            d='M0 1.75C0 1.336 0.336 1 0.75 1H9.25C9.664 1 10 1.336 10 1.75C10 2.164 9.664 2.5 9.25 2.5H0.75C0.336 2.5 0 2.164 0 1.75Z'
                            fill='currentColor'
                        />
                        <path
                            d='M0 5.25C0 4.836 0.336 4.5 0.75 4.5H5.25C5.664 4.5 6 4.836 6 5.25C6 5.664 5.664 6 5.25 6H0.75C0.336 6 0 5.664 0 5.25Z'
                            fill='currentColor'
                        />
                        <path
                            d='M0 8.75C0 8.336 0.336 8 0.75 8H5.25C5.664 8 6 8.336 6 8.75C6 9.164 5.664 9.5 5.25 9.5H0.75C0.336 9.5 0 9.164 0 8.75Z'
                            fill='currentColor'
                        />
                    </svg>
                </div>
                <div onClick={() => handelAlignmentChange('center')} className=' cursor-pointer select-none'>
                    <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`${alignment === 'center' ? 'text-[#323232]' : 'text-[#999999]'} `}>
                        <path
                            d='M0 1.75C0 1.336 0.336 1 0.75 1H9.25C9.664 1 10 1.336 10 1.75C10 2.164 9.664 2.5 9.25 2.5H0.75C0.336 2.5 0 2.164 0 1.75Z'
                            fill='currentColor'
                        />
                        <path
                            d='M2 5.25C2 4.836 2.336 4.5 2.75 4.5H7.25C7.664 4.5 8 4.836 8 5.25C8 5.664 7.664 6 7.25 6H2.75C2.336 6 2 5.664 2 5.25Z'
                            fill='currentColor'
                        />
                        <path
                            d='M2 8.75C2 8.336 2.336 8 2.75 8H7.25C7.664 8 8 8.336 8 8.75C8 9.164 7.664 9.5 7.25 9.5H2.75C2.336 9.5 2 9.164 2 8.75Z'
                            fill='currentColor'
                        />
                    </svg>
                </div>
                <div onClick={() => handelAlignmentChange('right')} className=' cursor-pointer select-none'>
                    <svg
                        width='10'
                        height='10'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`${alignment === 'right' ? 'text-[#323232]' : 'text-[#999999]'} `}>
                        <path
                            d='M0 1.75C0 1.336 0.336 1 0.75 1H9.25C9.664 1 10 1.336 10 1.75C10 2.164 9.664 2.5 9.25 2.5H0.75C0.336 2.5 0 2.164 0 1.75Z'
                            fill='currentColor'
                        />
                        <path
                            d='M4 5.25C4 4.836 4.336 4.5 4.75 4.5H9.25C9.664 4.5 10 4.836 10 5.25C10 5.664 9.664 6 9.25 6H4.75C4.336 6 4 5.664 4 5.25Z'
                            fill='currentColor'
                        />
                        <path
                            d='M4 8.75C4 8.336 4.336 8 4.75 8H9.25C9.664 8 10 8.336 10 8.75C10 9.164 9.664 9.5 9.25 9.5H4.75C4.336 9.5 4 9.164 4 8.75Z'
                            fill='currentColor'
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default TextAlignment
