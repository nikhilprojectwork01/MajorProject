class ExpressError extends Error{
    constructor(error,message){
        super();
        this.error = error ,
        this.message = message
    }
}

module.exports = ExpressError;