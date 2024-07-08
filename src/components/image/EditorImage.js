import React from 'react'

const EditorImage = ({ component, onContextMenuHandler }) => {
    return (
        <div
            onContextMenu={(e) => {
                e.stopPropagation()
                onContextMenuHandler(e, component)
            }}>
            <img src={component?.source} alt={component?.alt} style={component?.style} />
        </div>
    )
}

export default EditorImage
