import express from "express"

export class BaseController {
    basePath
    router

    constructor(basePath){
        this.basePath = basePath;
        this.router = express.Router();
    }

    registerRoutes(){
        throw Error("registerRoutes에 경로를 등록해주세요."); 
    }
    
    get basePath(){
        return this.basePath;
    }
    
    get router(){
        return this.router;
    }
}