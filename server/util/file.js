let fs = require("fs");
let path = require("path");

/**
 * 判断文件是否存在
 * @param {*} file 
 * @returns 
 */
function exsit(file){
    return new Promise(function(resolve,reject){
        try {
            fs.accessSync(file)
            resolve(true);
        } catch (error) {
            resolve(false);
        }
    })
}

/**
 * 创建目录
 * @param {*} dir 
 */
async function mkdir(dir){
    let _exsit = await exsit(dir);
    if(!_exsit){
        await mkdir(path.dirname(dir))
        fs.mkdirSync(dir);
    }
}

/**
 * 写入文件
 * @param {*} file 
 * @param {*} content 
 */
async function putContentFile(file,content){
    fs.writeFileSync(file,content);
}

function readSync(file){
    let data = fs.readFileSync(file);
    if(data){
        data=data.toString();
    }
    return data;
}
function unlink(file){
    fs.unlinkSync(file)
}


module.exports={
    exsit:exsit,
    mkdir:mkdir,
    putContentFile:putContentFile,
    readSync:readSync,
    unlink:unlink,
}