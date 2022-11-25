'use strict';
const config = require('../config/config')
const axios = require('axios').default;

const inewService = class{
   
    async getSimDetailsByICCID(iccid) {
        try {

            let postUrl = config.config.inewcrm.url; 
            let token = config.config.inewcrm.user;

            let param = {
                "iccid": iccid
            };

            const config_request = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                }
            };
            
            return await axios.post(postUrl + "/getSimDetailsByICCID", param, config_request)
            .then(function (response) {
                return {
                    success: true,
                    data: response.data.data.getSimDetailsByICCIDResponse
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
                "message": "Error getSimDetailsByICCID",
                "data": err
            }
        }
    }

}

module.exports = new inewService();