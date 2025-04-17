 const WebSocket = require("ws");
 let lock = require("./util/lock");
 let log = require("./util/log");
 let config = require("./util/config");
 const request = require('request-promise');
 
 class connect{
    heartBeatHandel;
    ws;
    init(){
        this.ws = new WebSocket(config.server);
        let _this = this;
        this.ws.on("open",function(){
            log.info("服务连接成功");
            _this.heartBeatHandel = setInterval(function (){
                _this.sendPing();
            },60000);
        });
        this.ws.on("close",async function(code,message){
            log.error("服务连接关闭");
            await _this.close();
            await lock.sleep(5000);
            _this.init();
        })
        this.ws.on("message",function(data){
            _this.message(JSON.parse(data));
        });
        this.ws.on("error",function(){
            log.error("服务连接异常");
        });
    }
    async close(){
        let _this = this;
        return new Promise(async function(resolve,reject){
            _this.clearHeartBeat();
            resolve();
        })
    }
    message(data){
        log.info("收到消息:",data);
        let _this = this;
        switch(data.action){
            case "run":         //开启ue4
                this.run(data.data);
                break;
            case "pong":
                this.messagePong();
                break;
        }
    }
    run(data){
        delete data.headers["host"];
        request({
            method: data.method,          // 替换实际方法 GET|POST|PUT等
            uri: config.httpServer+data.router,
            headers: data.headers,
            body: data.body,
            json: false,             // 自动序列化JSON
            timeout: 5000,          // 超时时间(ms)
            resolveWithFullResponse: true
        }).then(response=>{
            this.send("callback",{
                id:data.id,
                response:{
                    status:200,
                    headers:response.headers,
                    body:response.body
                }
            })
        }).catch(e=>{
            this.send("callback",{
                id:data.id,
                response:{
                    status:e.response.statusCode,
                    headers:e.response.headers,
                    body:e.response.body
                }
            })
        });
    }
    messagePong(){
    }
    sendPing(){
        this.send("ping");
    }

    send(action,data){
        let _data = {
            action:action
        }
        if(data!=undefined){
            _data.data=data;
        }
        log.info("发送消息",_data);
        _data=JSON.stringify(_data);
        this.ws.send(_data);
    }

    clearHeartBeat(){
        if(this.heartBeatHandel){
            clearInterval(this.heartBeatHandel);
            this.heartBeatHandel=null;
        }
    }
}


module.exports = connect;