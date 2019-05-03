class HttpResponse {

    /**
     * @param httpStatus
     */

    constructor(httpStatus) {
        this.httpStatus = httpStatus;
    }


    widthData(data){
        this.data = data;
        return this;
    }

    widthErrorCode(errorCode){
        this.errorCode = errorCode;
        return this;
    }

    widthErrorMesage(errorMesage){
        this.errorMesage = errorMesage;
        return this;
    }

    toJson(){
        return {
            http_status : this.httpStatus,
            errorCode : this.errorCode ? this.errorCode : null,
            errorMesage : this.errorMesage ? this.errorMesage : null,
            data : this.data ? this.data : null,
        }
    }
}

module.exports = HttpResponse;