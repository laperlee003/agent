var log4js = require('log4js');
var sws;
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
sws = log4js.getLogger("manage");
module.exports = {
    debug:function(...msg){
        sws.debug(...msg);
    },
    info:function(...msg){
        sws.info(...msg);
    },
    error:function(...msg){
        sws.error(...msg);
    }
}
