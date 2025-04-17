var express = require('express');
require('express-async-errors');
const http = require("http");
let config = require("./../util/config");

const log = require("./../util/log").system;
let router = require("./../application/router");



class httpd{
    constructor(){
        this.initWebserver();
    }
    initWebserver(){
        var app = express();
        router(app);
        let serverProxy = http.createServer({},app);
        serverProxy.listen(config.httpServer,function(){
            log.info(`http服务启动成功 http://127.0.0.1:${config.httpServer}`)
        });
    }


}
module.exports=httpd;