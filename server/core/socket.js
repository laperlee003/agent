let express = require('express');
let WebSocket = require('ws');
const http = require("http");

const log = require("./../util/log").system;
let config = require("./../util/config");

let masterWs = require("../application/masterWs/ws");

class Socket{
    masterWebsocket;



    constructor(){
        this.startMaster().start();
    }
    start(){
        const app = express();
        this.http = http.createServer(app);
        let _this = this;
        this.http.on("upgrade",function(req,socket,head){
            _this.masterWebsocket.handleUpgrade(req,socket,head,function(coon){
                _this.masterWebsocket.emit("connection",coon,req);
            })
        });
        this.http.listen(config.masterServer,function(){
            log.info(`websocket服务启动成功 ws://127.0.0.1:${config.masterServer}`);
        });
    }
    startMaster(){
        this.masterWebsocket = new WebSocket.Server({ noServer:true });
        this.masterWebsocket.on('connection', function (ws, req) {
            masterWs(ws,req);
        });
        return this;
    }
}

module.exports = Socket