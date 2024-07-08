export const DATA_TYPES = {
    STRING: 'STRING',
    OBJECT: 'OBJECT',
    ARRAY: 'ARRAY',
}
const applicationState = {
    product: {
        type: DATA_TYPES.OBJECT,
        child: [
            {
                key: 'image',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'name',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'description',
                isOptional: true,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'price',
                isOptional: false,
                type: DATA_TYPES.OBJECT,
                child: [
                    {
                        key: 'actualPrice',
                        isOptional: false,
                        type: DATA_TYPES.STRING,
                    },
                    {
                        key: 'discountedPrice',
                        isOptional: false,
                        type: DATA_TYPES.STRING,
                    },
                    {
                        key: 'currency',
                        isOptional: false,
                        type: DATA_TYPES.OBJECT,
                        child: [{ key: 'symbol', isOptional: false, type: DATA_TYPES.STRING }],
                    },
                ],
            },
            {
                key: 'actualPrice',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'discountedPrice',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
        ],
    },
    productArray: {
        type: DATA_TYPES.ARRAY,
        child: [
            {
                key: 'image',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'name',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'description',
                isOptional: true,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'price',
                isOptional: false,
                type: DATA_TYPES.OBJECT,
                child: [
                    {
                        key: 'actualPrice',
                        isOptional: false,
                        type: DATA_TYPES.STRING,
                    },
                    {
                        key: 'discountedPrice',
                        isOptional: false,
                        type: DATA_TYPES.STRING,
                    },
                ],
            },
            {
                key: 'actualPrice',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'discountedPrice',
                isOptional: false,
                type: DATA_TYPES.STRING,
            },
            {
                key: 'productFeatures',
                isOptional: false,
                type: DATA_TYPES.ARRAY,
                child: [
                    {
                        key: 'title',
                        isOptional: false,
                        type: DATA_TYPES.STRING,
                    },
                ],
            },
        ],
    },
}

export default applicationState
