let fs = require("fs");
function config(){
    if(fs.existsSync(process.cwd()+"/config.json")){
        return require(process.cwd()+"/config.json");;
    }
    return null;
}

module.exports = config();