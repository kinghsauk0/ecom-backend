class ApiResponse {
    constructor(
        statusCode,
        message = "Success",
        data = null,
        length,
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success =statusCode < 400
        this.length=length;
    }
}

export default ApiResponse