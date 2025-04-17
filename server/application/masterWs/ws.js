let engineWebsocket = require("../../lib/websocket");
let log = require("../../util/log").master;
let string = require("../../util/string")
let masterHelper = require("../../helper/masterHelper");

class heartBeat{
    closeTimeOut;
    wsClient;
    constructor(wsClient){
        this.wsClient=wsClient;
        return this;
    }
    keep(){
        if(this.closeTimeOut){
            clearTimeout(this.closeTimeOut);
            this.closeTimeOut=null;
        }
        let _this = this;
        this.closeTimeOut=setTimeout(function(){
            _this.wsClient.terminate();
        },65000);
    }
    clear(){
        clearTimeout(this.closeTimeOut);
    }
}

class action{
    wsClient;
    constructor(wsClient){
        this.wsClient=wsClient;
        return this;
    }
    

    pong(){
        this.send("pong");
    }
    run(router,method,headers,body){
        return new Promise((reslove,reject)=>{
            let id = string.randomString(32);
            this.wsClient.msg.httpRun[id]=reslove;
            this.send("run",{
                id:id,
                router,method,headers,body
            });
        });
    }


    error(message,code){
        //node端收到error消息会直接关闭
        this.send("error",{
            message:message,
            err:code
        })
    }

    //发送数据
    send(action,param){
        let data = {
            action:action,
        }
        if(param){
            data.data=param;
        }
        log.info("发送消息",data);
        this.wsClient.send(JSON.stringify(data))
    }
}

class message{
    wsClient;
    constructor(wsClient){
        this.wsClient=wsClient;
        this.httpRun={};
        return this;
    }
    msg(msg){
        switch(msg.action){
            case "ping":
                this.messagePing();
            break;
            case "callback":
                this.messageCallback(msg.data);
                break;
        }
    }
    messageCallback(data){
        if(this.httpRun[data.id]){
            this.httpRun[data.id](data.response);
            delete this.httpRun[data.id];
        }
    }
    messagePing(){
        this.wsClient.action.pong();
        this.wsClient.heartBeat.keep();
    }
}


class masterWs extends engineWebsocket.client{
    connected(req){
        this.id=string.randomString(32);
        this.action=new action(this);
        this.msg=new message(this);
        this.heartBeat=new heartBeat(this);
        if(masterHelper.exsit()){
            this.terminate();
        }
        masterHelper.set(this);
        log.info("新的代理端连接");
    }

    close(){
        this.heartBeat.clear();     //清理心跳包
        masterHelper.del(this);
    }
    //消息处理
    message(msg){
        try {
            msg = JSON.parse(msg);
        } catch (err) {
            return;
        }
        log.info("收到消息",msg);
        this.msg.msg(msg);
    }
}

function init(ws,req){
    new masterWs(ws,req);
}

module.exports=init;