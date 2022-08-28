import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import { socketController } from '../controllers/socket.controller';

interface IPaths {
    [key: string]: string;
}

export class Server {
    public app: express.Application;
    public port: number;
    public server: http.Server;
    public io: socketIO.Server;
    private paths: IPaths;
    

    constructor(port:number = 3000) {
        this.app = express();
        this.port = Number(process.env.PORT) || port;
        this.server = http.createServer(this.app);
        this.io = new socketIO.Server(this.server);
        this.paths = {}
        

        //middlewares
        this.middlewares();

        //routes
       this.routes();

       //events Configuration
       this.sockets();
        
    }

    static init(port: number) {
        return new Server(port);
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //read and body parser
        this.app.use(express.json());

        //static files
        this.app.use(express.static('public'));
    }

    routes(){
        //this.app.use( this.paths.auth, authRouter );
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        }
        );
    }
    sockets(){
        this.io.on('connection',socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Websocket Server is running on port: ' + this.port);
        }).on('error', (err: Error) => {
            console.log(err);
        });
    }

}