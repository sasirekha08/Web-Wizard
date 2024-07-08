import React, { Fragment } from 'react'
import { componentsTypes } from '../../componentList'
import Paragraph from '../../components/paragraph/Paragraph'
import Button from '../../components/button/Button'
import ImageComponent from '../../components/image/ImageComponent'
import VideoComponent from '../../components/video/VideoComponent'
import Tabs from '../../components/tabs/Tabs'

const RecursiveElements = (templateData) => {
    const { type, style, children, apiDetails, text, eventHandler, ...props } = templateData
    switch (type) {
        case 'container':
            return (
                <div style={style}>
                    {children &&
                        children?.map((child, index) => {
                            if (templateData?.groupedData) {
                                child.groupedData = templateData?.groupedData
                            }
                            return <Fragment key={index}>{RecursiveElements(child)}</Fragment>
                        })}
                </div>
            )

        case componentsTypes.TEXT:
            let content = text
            const keyPath = apiDetails?.key?.split('.')
            const getValueByPath = (data, Path) => {
                let elementData
                Path?.forEach((key) => {
                    if (typeof data?.[key] === 'object') {
                        // Corrected the recursive call
                        elementData = getValueByPath(
                            data?.[key],
                            Path.filter((f) => f !== key),
                        )
                    } else if (data?.[key]) {
                        elementData = data?.[key]
                    }
                })
                return elementData
            }
            if (templateData?.groupedData) {
                content = getValueByPath(templateData?.groupedData, keyPath)
            }
            console.log(keyPath, content, 'content')
            return <Paragraph content={content || text} style={style} />

        case componentsTypes.BUTTON:
            return <Button style={style} content={text} eventHandler={eventHandler} />

        case componentsTypes.IMAGE:
            let source = templateData?.source
            if (templateData?.groupedData?.[apiDetails?.key]) {
                source = templateData?.groupedData?.[apiDetails?.key]
            }
            console.log(templateData, 'templateData')
            return <ImageComponent component={templateData} source={source} />

        case componentsTypes.VIDEO:
            return <VideoComponent component={templateData} />

        case componentsTypes.TAB_GROUP:
            const tabPage = (selectedTab) => {
                console.log('selectedTab', selectedTab)
                return <Fragment>{selectedTab?.children?.map((child) => RecursiveElements(child))}</Fragment>
            }
            return <Tabs component={templateData}>{tabPage}</Tabs>
        case componentsTypes.GROUPED_CONTAINER:
            const groupedKeyPath = apiDetails?.key?.split('.')

            const getDataByPath = (data, Path) => {
                let elementData = data
                Path?.forEach((key) => {
                    elementData = data?.[key]
                })
                return elementData
            }
            const arrayData = getDataByPath(templateData?.groupedData, groupedKeyPath)
            console.log(arrayData, 'arrayData')
            return (
                <div style={style}>
                    {arrayData?.map((childData) => {
                        return (
                            <>
                                {children &&
                                    children?.map((child, index) => {
                                        child.groupedData = childData
                                        return <Fragment key={index}>{RecursiveElements(child)}</Fragment>
                                    })}
                            </>
                        )
                    })}
                </div>
            )
        default:
            return null
    }
}

export default RecursiveElements
