const {StatusCodes}  = require('http-status-codes');

class unauthenticatedError  extends Error {
    constructor(message){
        super(message),
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = unauthenticatedError