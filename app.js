const http = require('http');
const director = require('director');
const Bot = require('./bot');

const router = new director.http.Router({
    '/': {
        post: Server().postResponse,
        get: Server().getResponse
    }
});

const server = new Server(router);
server.serve();

class Server {
    constructor(router, port) {
        this.server = http.createServer(function(req, res) {
            req.chunks = [];
            req.on('data', function(chunk) {
                req.chunks.push(chunk.toString());
            });
        });

        this.port = Number(process.env.PORT || 3000);
    };

    serve() {
        this.server.listen(this.port);
        console.log('Running on port' + this.port);
    };

    static getResponse() {
        this.res.end('');
    };

    static postResponse() {
        const reqMessage = JSON.parse(this.req.chunks[0]);

        this.res.writeHead(200);
        this.res.end();

        const resMessage = Bot.checkMessage(reqMessage);

        if (resMessage) {
            Bot.sendMessage(resMessage);
        }
    };
};