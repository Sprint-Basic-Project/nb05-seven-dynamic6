import { BaseController } from "./base.controller.js";

export class TestController1 extends BaseController{
    #service

    constructor(service){
        super("/test1");
        this.#service = service;
        this.registerRoutes();
    }

    registerRoutes(){
        this.router.get("/1", this.mainPage1Middleware);
    }

    
    mainPage1Middleware = (req, res) => {
        return res.json("Hello world1!");
    }
}