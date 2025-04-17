const httpd = require("./core/webserver");
let Socket = require("./core/socket");

new httpd();
new Socket();