# agent
proxy web request from Cloud Server to lan in pc.

将发往云服务器的web请求转发到局域网pc主机上


# client
客户端运行于pc主机上


- config.json
配置项

server 为 server服务的地址

httpServer 为本地处理web请求的服务地址


# server
服务端程序 运行于云服务器

- config.json
配置项

httpServer 为云服务器端服务监听端口

masterServer 云服务器端提供给客户端连接的端口


# 运行
### 第一步
先在server目录执行npm install
然后进行程序打包
打包需要本地先安装pkg依赖
windows包：npm run buildWin
linux包：npm run buildLinux
mac包：npm run buildMac
打包好了以后将打包程序发送到云服务器端运行起来(config.json也记得传上去，跟执行程序同目录)

### 第二步
先在client目录执行npm install
然后进行程序打包
打包需要本地先安装pkg依赖
windows包：npm run buildWin
linux包：npm run buildLinux
mac包：npm run buildMac
打包好了以后配置好congfig.json文件执行打包程序
这时候服务端会显示新的代理端连接
客户端会显示服务器连接成功

### 第三步
请求云服务器端地址和端口(server/config.json文件里面httpServer的端口号)
就可以将本地web服务通过云服务器实现对外访问