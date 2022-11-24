'use strict';
const config = require('../config/config')
const axios = require('axios').default;

const inewService = class{
   
    async getSimDetailsByMSISDN(msisdn) {
        try {

            let postUrl = config.config.inewcrm.url;
            let token = config.config.inewcrm.user;

            let param = {
                "msisdn": msisdn
            };

            const config_request = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                }
            };

            console.log(JSON.stringify(config_request, null, 4))
            
            
            return await axios.post(postUrl + "/getSimDetailsByMSISDN", param, config_request)
            .then(function (response) {
                return {
                    success: true,
                    data: response.data
                };
            })
            .catch(function (error) {
                return {
                    success: false,
                    codeHttp: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                };
            });

        } catch (err) {
            console.log(err);
            return {
                "success": false,
                "message": "Error getSimDetailsByMSISDN",
                "data": err
            }
        }
    }

}

module.exports = new inewService();