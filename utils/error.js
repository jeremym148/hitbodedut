'use strict';
/*
 * Error Service, linking Custom error codes with translation key
 */

const path = require('path');

//NPM Dependencies

//Internal Dependencies
const logger = require('../middlewares/logger');
const errorCodes = require('../config/errorcodes.json');

//Module Vars


//Module Logic
const ErrorService = {

    errorCodes: errorCodes,

    // call this function with arguments:
    // (errorCode, err) or (err)
    logError() {
        let errorMessage = "";
        let errorParam = arguments[0];
        // if only 1 argument which is not an errorCode
        if (arguments.length === 1 && !this.errorCodes[arguments[0]]) {
            // if no errorCode specified, a generic message is sent to user (if displayed)
            errorMessage = this.errorCodes["GENERIC_ERROR"][1];
            logger.error(errorParam);
        }
        //if 2 arguments (errorCode, err)
        else if (arguments.length >= 2) {
            if (arguments[2] === true){
                errorMessage = arguments[1];
            } else{
                errorMessage = `${this.errorCodes[errorParam][1]}  ${this.errorCodes[errorParam][0] && this.errorCodes[errorParam][0] != "" ? `- Error code: ${this.errorCodes[errorParam][0]}` : ``}`;
            }
            logger.error(arguments);
            logger.error(`Error code: ${this.errorCodes[errorParam][0]}`);
            console.log(arguments[1])
        }
        else {
            errorMessage = `${this.errorCodes[errorParam][1]}  ${this.errorCodes[errorParam][0] && this.errorCodes[errorParam][0] != "" ? `- Error code: ${this.errorCodes[errorParam][0]}` : ``}`;
            logger.error(errorMessage);
        }
        return errorMessage;
    }
};

module.exports = ErrorService;