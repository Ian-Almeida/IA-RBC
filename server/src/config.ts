import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import controllers from './controllers';

export class ServerConfig {
    private app: express.Application;
    private defaultPath: string;

    constructor() {
        this.app = express();
        this.defaultPath = '/api';
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }

    public routes() {
        this.app.use(`${this.defaultPath}/conhecimento`, controllers.conhecimento.router);
        this.app.get('/', ( req: Request, res: Response ) => {
            res.send( "Hello World" );
        });
    }

    public start() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening port ${this.app.get('port')} port.`);
        });
    }
}
