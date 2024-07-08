import { v4 as uuidv4 } from 'uuid'

import ButtonSVG from './assets/components/ButtonIcon.svg'
import ContainerSVG from './assets/components/ContainerIcon.svg'
import ImageSVG from './assets/components/ImageIcon.svg'
import TabContainerSVG from './assets/components/TabContainerIcon.svg'
import TextSVG from './assets/components/TextIcon.svg'
import VideoSVG from './assets/components/VideoIcon.svg'

// Components Types
export const componentsTypes = {
    TEXT: 'text',
    BUTTON: 'button',
    CONTAINER: 'container',
    IMAGE: 'image',
    VIDEO: 'video',
    TAB_GROUP: 'tabGroup',
    GROUPED_CONTAINER: 'groupedContainer',
}

export const styleProperties = {
    TEXT_ALIGNMENT: 'textAlignment',
    TEXT_COLOR: 'color',
    BACKGROUND_COLOR: 'backgroundColor',
    FONT_STYLE: 'fontStyle',
    FONT_SIZE: 'fontSize',
    PADDING: 'padding',
    MARGIN: 'margin',
    DISPLAY: 'display',
    DIMENSIONS: 'dimensions',
    GAP: 'gap',
    TEXT_DECORATION_LINE: 'textDecorationLine',
    FONT_WEIGHT: 'fontWeight',
    BORDER: 'border',
    ALIGN_ITEMS: 'alignItems',
    BOX_SHADOW: 'boxShadow',
}

export const componentProperties = {
    UNIQUE_KEY: 'uniqueKey',
    TAB_ITEMS: 'tabItems',
    TAB_LAYOUT: 'tabLayout',
}

export const buttonFunctionTypes = {
    ADD_ROUTES: 'addRoutes',
    CALL_API: 'callApi',
}

export const componentsStyleConfig = {
    [componentsTypes.TEXT]: [
        styleProperties.TEXT_ALIGNMENT,
        styleProperties.FONT_SIZE,
        styleProperties.FONT_WEIGHT,
        styleProperties.FONT_STYLE,
        styleProperties.TEXT_COLOR,
        styleProperties.PADDING,
        styleProperties.MARGIN,
    ],
    [componentsTypes.BUTTON]: [
        styleProperties.FONT_SIZE,
        styleProperties.FONT_STYLE,
        styleProperties.TEXT_COLOR,
        styleProperties.BACKGROUND_COLOR,
        styleProperties.DIMENSIONS,
        styleProperties.PADDING,
        styleProperties.MARGIN,
        styleProperties.BORDER,
    ],
    [componentsTypes.IMAGE]: [
        styleProperties.BACKGROUND_COLOR,
        styleProperties.DIMENSIONS,
        styleProperties.PADDING,
        styleProperties.MARGIN,
    ],
    [componentsTypes.VIDEO]: [
        // styleProperties.BACKGROUND_COLOR,
        styleProperties.DIMENSIONS,
        styleProperties.PADDING,
        styleProperties.MARGIN,
    ],
    [componentsTypes.CONTAINER]: [
        styleProperties.BACKGROUND_COLOR,
        styleProperties.DISPLAY,
        styleProperties.PADDING,
        styleProperties.MARGIN,
        styleProperties.DIMENSIONS,
        styleProperties.GAP,
        styleProperties.BOX_SHADOW,
        styleProperties.BORDER,
        styleProperties.ALIGN_ITEMS,
    ],
    [componentsTypes.GROUPED_CONTAINER]: [
        styleProperties.BACKGROUND_COLOR,
        styleProperties.DISPLAY,
        styleProperties.PADDING,
        styleProperties.MARGIN,
        styleProperties.DIMENSIONS,
        styleProperties.GAP,
        styleProperties.BOX_SHADOW,
        styleProperties.BORDER,
        styleProperties.ALIGN_ITEMS,
    ],
}

export const componentConfigs = {
    [componentsTypes.TEXT]: [componentProperties.UNIQUE_KEY],
    [componentsTypes.BUTTON]: [componentProperties.UNIQUE_KEY],
    [componentsTypes.IMAGE]: [componentProperties.UNIQUE_KEY],
    [componentsTypes.VIDEO]: [componentProperties.UNIQUE_KEY],
    [componentsTypes.CONTAINER]: [componentProperties.UNIQUE_KEY],
    [componentsTypes.TAB_GROUP]: [componentProperties.TAB_ITEMS, componentProperties.TAB_LAYOUT],
}

const componentsList = [
    {
        id: '1',
        name: 'Text',
        type: componentsTypes.TEXT,
        icon: TextSVG,
        placeholder: '...edit me...',
        text: '...edit me...',
        style: {
            fontSize: '16px',
            fontWeight: '400',
        },
        styleConfig: componentsStyleConfig[componentsTypes.TEXT],
        componentConfig: componentConfigs[componentsTypes.TEXT],
    },
    {
        id: '2',
        name: 'Button',
        type: componentsTypes.BUTTON,
        icon: ButtonSVG,
        placeholder: '...edit me...',
        text: '...edit me...',
        style: {
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem',
            borderColor: 'transparent',
            ':hover': {
                borderColor: '#06B6D4',
            },
            fontSize: '16px',
        },
        styleConfig: componentsStyleConfig[componentsTypes.BUTTON],
        componentConfig: componentConfigs[componentsTypes.BUTTON],
    },
    {
        id: '4',
        name: 'Container',
        type: componentsTypes.CONTAINER,
        icon: ContainerSVG,
        children: [],
        style: {
            backgroundColor: 'inherit',
        },
        styleConfig: componentsStyleConfig[componentsTypes.CONTAINER],
        componentConfig: componentConfigs[componentsTypes.CONTAINER],
    },
    {
        id: '6',
        name: 'Tab Group',
        group: componentsTypes.TAB_GROUP,
        type: componentsTypes.TAB_GROUP,
        icon: TabContainerSVG,
        componentConfig: componentConfigs[componentsTypes.TAB_GROUP],
        children: [
            {
                type: 'tab',
                compId: uuidv4(),
                name: 'Option 1',
                children: [],
            },
            {
                type: 'tab',
                compId: uuidv4(),
                name: 'Option 1',
                children: [],
            },
            {
                type: 'tab',
                compId: uuidv4(),
                name: 'Option 3',
                children: [],
            },
        ],
        layout: 'inline',
    },

    {
        id: '5',
        name: 'Video',
        type: componentsTypes.VIDEO,
        icon: VideoSVG,
        poster: '',
        source: 'https://www.youtube.com/watch?v=9sR-36kdyqs',
        // source:'https://careerladderbucket.s3.eu-west-2.amazonaws.com/general/8585bf1d-db38-40bc-b147-d80d216eac52/imnotdun-video.mp4',
        style: {
            borderColor: 'transparent',
            ':hover': {
                borderColor: '#06B6D4',
            },
            width: '100%',
            height: '100%',
        },
        styleConfig: componentsStyleConfig[componentsTypes.VIDEO],
        componentConfig: componentConfigs[componentsTypes.VIDEO],
    },
    {
        id: '3',
        name: 'Image',
        type: componentsTypes.IMAGE,
        icon: ImageSVG,
        alt: 'temp image',
        // source: 'https://media.iamnotdone.net/courses/images/Banner-Image.jpg',
        style: {
            borderColor: 'transparent',
            ':hover': {
                borderColor: '#06B6D4',
            },
            width: '100%',
            height: '100%',
        },
        styleConfig: componentsStyleConfig[componentsTypes.IMAGE],
        componentConfig: componentConfigs[componentsTypes.IMAGE],
    },
    {
        id: '18',
        name: 'Grouped Container',
        type: componentsTypes.GROUPED_CONTAINER,
        icon: ContainerSVG,
        children: [],
        style: {
            backgroundColor: 'inherit',
        },
        styleConfig: componentsStyleConfig[componentsTypes.GROUPED_CONTAINER],
        componentConfig: componentConfigs[componentsTypes.CONTAINER],
    },
]

export default componentsList
