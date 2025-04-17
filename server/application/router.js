let controller = require("./controller");

module.exports = (app)=>{
    app.use((req, res, next) => {
        let data = ''
        req.on('data', chunk => data += chunk)
        req.on('end', () => {
            req.rawBody = data     // 原始字符串存入req.rawBody
            next()
        })
    })
    app.all("*",controller);
}