export class BaseReqDTO {
    headers;
    body;
    params;
    query;
    file;
    files;

    constructor({
        headers = {},
        body = {},
        params = {},
        query = {},
        file = {},
        files =[]}
    ) {
        this.headers = headers;
        this.body = body;
        this.params = params;
        this.query = query;
        this.file = file;
        this.files = files;
    }
}   