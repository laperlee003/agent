

class client{
    closeCallBackFn;
    constructor(ws,req){
        this.online=true;
        let _this = this;
        ws.on('message', function(msg){
            _this.message(msg);
            msg=null;
        });
        ws.on('close', function() {
            _this.online=false;
            _this.close();
            if(_this.closeCallBackFn){
                _this.closeCallBackFn();
            }
        });

        ws.on('error', function() {
            // _this.close();
        });
        this.ws=ws;
        this.connected(req);
    }
    message(msg){};         //消息处理
    close(){};              //关闭处理
    setAfterClose(fn){
        this.closeCallBackFn=fn;
    };
    connected(req){};          //连接创建以后

    send(data){
        this.ws.send(data);
        data=null;
    }
    terminate(){
        this.ws.terminate();
    }
}

module.exports=client;