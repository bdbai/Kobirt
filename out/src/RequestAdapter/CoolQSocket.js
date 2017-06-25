"use strict";
/**
 * https://github.com/haozi23333/kuQforNodeJSPlugin/blob/1ea9905952f17002b6cb7a7acd929a14fe1a21a3/src/SocketConnect.ts
 * 扒拉下来的
 */
/**
 * Created by haozi on 2/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = require("dgram");
const events_1 = require("events");
/**
 *  socket连接类
 */
class SocketClient extends events_1.EventEmitter {
    /**
     *
     * @param parm ISocketConnectInitParm
     */
    async init(parm = {}) {
        await this.close();
        this.serverSocket = dgram_1.createSocket('udp4');
        this.clientSocket = dgram_1.createSocket('udp4');
        this.clientPort = parm.clientPort || 27788;
        this.serverPort = parm.serverPort || 11235;
        this.serverSocket.bind(this.clientPort);
        this.Host = parm.serverHost || '127.0.0.1';
        this.listener();
        const rinfo = await this.send(this.serverHello());
        this.emit('connect', rinfo);
        this.heartRateService();
    }
    listener() {
        this.clientSocket.on('message', (msg) => {
        });
        this.serverSocket.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.serverSocket.close();
        });
        this.serverSocket.on('message', (msg, rinfo) => {
            const segs = new Buffer(msg, 'base64').toString();
            if (segs.startsWith('ServerHello')) {
                console.log('Server says hello!');
                clearInterval(this.rescue);
            }
            this.emit('recv', segs.split(' '));
            /*console.info({
                messageId: v4(),
                timeStamp: new Date().getTime(),
                content: (new Buffer(msg, 'base64').toString()).split(' '),
                app: this
            })*/
        });
        /**
         *
         */
        this.serverSocket.on('listening', () => {
            const address = this.serverSocket.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        /**
         *
         */
        this.on('send', (data) => {
            this.send(data);
        });
    }
    /**
     * 向服务器发送socket数据
     * @param data 数据
     * @returns {Promise<void>|Promise|IThenable<void>}
     * @public
     */
    send(data) {
        return new Promise((s, j) => {
            this.clientSocket.send(data, 0, data.length, this.serverPort, this.Host, (err) => {
                if (err) {
                    j(err);
                }
                else {
                    s();
                }
            });
        });
    }
    /**
     * 构造clienthello信息
     * @returns {string}
     * @private
     */
    serverHello() {
        return `ClientHello ${this.clientPort}`;
    }
    /**
     * 发送心跳包
     * 30秒一次
     */
    heartRateService() {
        this.heart = setInterval(() => {
            this.send(this.serverHello());
        }, 300000);
        this.rescue = setInterval(() => {
            console.log('Waiting for server hello');
            this.send(this.serverHello());
        }, 1000);
    }
    async close() {
        if (this.clientSocket) {
            await this.closeSocket(this.clientSocket);
            this.clientSocket = null;
        }
        if (this.serverSocket) {
            await this.closeSocket(this.serverSocket);
            this.serverSocket = null;
        }
    }
    closeSocket(socket) {
        return new Promise((s, j) => {
            socket.close(() => {
                s();
            });
        });
    }
    /**
     * 开始监听
     * 这个函数必须在use完成后调用
     * @param serverPort
     * @param clientPort
     * @param serverHost
     */
    listen(param) {
        return this.init(param);
    }
}
exports.SocketClient = SocketClient;
//# sourceMappingURL=CoolQSocket.js.map