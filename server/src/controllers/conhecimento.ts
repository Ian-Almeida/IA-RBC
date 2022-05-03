import { Router, Response, Request } from 'express';
import ConhecimentoService from '../services/conhecimento';

export default class ConhecimentoController {
    public router: Router;
    private services: ConhecimentoService

    constructor() {
        this.router = Router();
        this.services = new ConhecimentoService();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        // res.send('Conhecimento Index')
        res.send(await this.services.index());
    }

    public create = async (req: Request, res: Response) => {
        // res.send('Conhecimento Create')
        res.send(this.services.create());
    }

    public update = async (req: Request, res: Response) => {
        // res.send('Conhecimento Update')
        res.send(this.services.update());
    }

    public delete = async (req: Request, res: Response) => {
        // res.send('Conhecimento Delete')
        res.send(this.services.delete());
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}