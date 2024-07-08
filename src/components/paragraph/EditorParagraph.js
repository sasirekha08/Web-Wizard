import React from 'react'

const EditorParagraph = ({ text, style, onContextMenuHandler, component }) => {
    let keyArray = component?.apiDetails?.key?.split('.')
    keyArray = keyArray?.[keyArray?.length - 1]
    return (
        <div
            className={`  cursor-pointer  `}
            style={style}
            onContextMenu={(e) => {
                e.stopPropagation()
                onContextMenuHandler(e, component)
            }}>
            {component?.apiDetails?.key ? `(${keyArray})` : text || '...edit me...'}
        </div>
    )
}

export default EditorParagraph
