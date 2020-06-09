const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Name: {
                type: 'string'
            },
            Phone: {
                type: 'string'
            },
            IdNumber: {
                type: 'string'
            },
            Vehicles: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        Plate: {
                            type: 'string'
                        },
                        Type: {
                            type: 'integer',
                            enum: [1, 2, 3]
                        },
                        Active: {
                            type: 'boolean'
                        },
                        CheckinDate: {
                            type: 'string'
                        },
                        CheckoutDate: {
                            type: 'string'
                        },
                        Basement: {
                            type: 'string'
                        },
                        Card: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }
};

module.exports = schema;