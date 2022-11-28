const config = {
    dev: ['local', 'development'].includes(process.env.NODE_ENV),
    inewcrm: {
        url: process.env.CRM_URL || "https://avr3sva6zl.execute-api.us-east-1.amazonaws.com/prod/api/v1",
        user: process.env.CRM_TOKEN || "c61261c0-ae2d-4bdb-816e-dba53f171c59"
    },
}


module.exports = {
    config
}