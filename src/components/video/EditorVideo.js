import React from 'react'

const EditorVideo = ({ component, onContextMenuHandler }) => {
    // console.log('Video', component)
    return (
        <div
            onContextMenu={(e) => {
                e.stopPropagation()
                onContextMenuHandler(e, component)
            }}>
            <video
                style={component?.style}
                // poster={component?.poster}
                // autoPlay
                preload='true'
                controls>
                <source
                    src={component?.source}
                    //   type='video/mp4'
                />
            </video>
        </div>
    )
}

export default EditorVideo
