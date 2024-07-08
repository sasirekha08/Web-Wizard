import React from 'react'

const EditorContainer = ({ style, onContextMenuHandler, component, children }) => {
    return (
        <div
            className={`  cursor-pointer border-red-200  p-1 ${
                component?.children?.length > 0 ? '' : 'min-h-[100px] min-w-[100px]'
            }  border `}
            style={style}
            onContextMenu={(e) => {
                e.stopPropagation()
                onContextMenuHandler(e, component)
            }}>
            {children}
        </div>
    )
}

export default EditorContainer

