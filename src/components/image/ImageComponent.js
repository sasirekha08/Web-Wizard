import React from 'react'

const ImageComponent = ({ component, source }) => {
    return (
        <div>
            <img src={source} alt={component?.alt} style={component?.style} />
        </div>
    )
}

export default ImageComponent
