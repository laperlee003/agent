let masterHelper = require("./../../helper/masterHelper");


module.exports=(req,res)=>{
    let master = masterHelper.get();
    if(master){
        console.log(req.headers);
        master.action.run(req.url,req.method,req.headers,req.rawBody).then(data=>{
            res.status(data.status).set(data.headers).send(data.body);
        });
    }
}

