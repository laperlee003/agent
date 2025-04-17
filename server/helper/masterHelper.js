
class clients{
    constructor(){
        this.master = null;
    }

    exsit(){
        return this.master ? true : false;
    }

    set(master){
        this.master=master;
    }
    
    del(master){
        if(this.master.id==master.id){
            this.master=null;
        }
    }

    get(){
        return this.master;
    }
}
let client = new clients;

module.exports=client;