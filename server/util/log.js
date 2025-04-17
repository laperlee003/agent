let log4js = require('log4js');
log4js.configure({
"appenders": {
    "console": {
        "type": "console"
    },
    "file": {
        "type": "dateFile",
        "filename": "logs/file",
        "encoding": "utf-8",
        "maxLogSize": 1000000,
        "numBackups": 3,
        "pattern": "yyyy-MM-dd.log",
        "alwaysIncludePattern": true
    }
},
"categories": {
    "default": {
        "appenders": [
            "console",
            "file"
        ],
        "level": "debug"
    }
}
});
let system = log4js.getLogger("system");
let master = log4js.getLogger("master");


module.exports = {
    system:{
        debug:function(...msg){
            system.debug(...msg);
        },
        info:function(...msg){
            system.info(...msg);
        },
        error:function(msg){
            system.error(msg);
        }
    },
    master:{
        debug:function(msg){
            master.debug(msg);
        },
        info:function(...msg){
            master.info(...msg);
        },
        error:function(msg){
            master.error(msg);
        }
    },
}
