import React from 'react'

const EditorButton = (props) => {
    return (
        <button
            // className={`bg-blue-500 text-white p-2 `}
            className=' w-full'
            onContextMenu={(e) => {
                e.stopPropagation()
                props?.onContextMenuHandler(e, props?.component)
            }}
            style={props?.style}>
            {props?.text || '...edit me...'}
        </button>
    )
}

export default EditorButton

