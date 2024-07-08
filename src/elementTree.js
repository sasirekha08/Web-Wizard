let elementTree = [
    {
        container: '3gridDiv',
        styles:{
            "display":"grid",
            "grid-template-column":"repeat(3,minmax(0,1fr))"
        },
        children: [{
            container: 'div',
            children: [{ component: "text" }, { component: "button" }],
        },
        {
            container: 'div',
            children: [{ component: "text" }, { component: "button" }],
        },
        {
            container: 'div',
            children: [{ component: "text" }, { component: "button" }],
        }],
    },
]


let sampleElementTree= [{
    id: '1',
    name: 'Container',
    type: 'container',
    children: [
        {
            id: '1',
            name: 'Text',
            type: 'text',
            placeholder: '...edit me...',
            text: '...edit me...',
            compId: '38fcb3a8-bcf1-4e6c-b865-c7b00105945f',
            order: 1,
        },
        {
            id: '1',
            name: 'Container',
            type: 'container',
            children: [
                {
                    id: '1',
                    name: 'Text',
                    type: 'text',
                    placeholder: '...edit me...',
                    text: '...edit me...',
                    compId: '38fcb3a8-bcf1-4e6c-b865-c7b00105876f',
                    order: 1,
                },
                {
                    id: '2',
                    name: 'Button',
                    type: 'button',
                    placeholder: '...edit me...',
                    text: '...edit me...',
                    style: {
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem',
                        borderColor: 'transparent',
                        ':hover': {
                            borderColor: '#06B6D4',
                        },
                    },
                    eventHandler:{
                        type:'API CALL'/'ADD ROUTE',
                        eventValue:'GET_COURSES'/'course-details'
                    },
                    compId: '2f9971ca-17d2-4b02-aff2-78b264053732',
                    order: 3,
                },
            ],
            compId: '6e8286fd-edc9-43ec-9ce9-34f670c9ccfb',
            order: 2,
        },
        {
            id: '2',
            name: 'Button',
            type: 'button',
            placeholder: '...edit me...',
            text: '...edit me...',
            style: {
                background: '#3b82f6',
                color: 'white',
                padding: '0.5rem',
                borderColor: 'transparent',
                ':hover': {
                    borderColor: '#06B6D4',
                },
            },
            compId: '2f9971ca-17d2-4b02-aff2-78b2640e0732',
            order: 3,
        },
    ],
    compId: '236b9933-b4cf-40ce-aa4d-492fde36c69d',
    order: 1,
},
{
    id: '1',
    name: 'Text',
    type: 'text',
    placeholder: '...edit me...',
    text: '...edit me...',
    compId: '642eaa8c-5962-4358-ab2b-5db1667225eb',
    order: 2,
},
]
