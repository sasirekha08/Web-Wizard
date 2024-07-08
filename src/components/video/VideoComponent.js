import React from 'react'

const VideoComponent = ({ component }) => {
    return (
        <div>
            <video
                // autoPlay
                preload='true'
                //  muted
                //  loop
                poster={component?.poster}
                style={component?.style}
                controls>
                <source src={component?.source} type='video/mp4' />
            </video>
        </div>
    )
}

export default VideoComponent

