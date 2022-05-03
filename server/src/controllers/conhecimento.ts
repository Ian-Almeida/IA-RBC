import { Router, Response, Request } from 'express';
import { ConhecimentoEntity } from '../entities/conhecimento';
import ConhecimentoService from '../services/conhecimento';

export default class ConhecimentoController {
  public router: Router;
  private services: ConhecimentoService;

  constructor() {
    this.router = Router();
    this.services = new ConhecimentoService();
    this.routes();
  }

  public findAll = async (req: Request, res: Response) => {
    res.send(await this.services.findAll());
  };

  public findOne = async (req: Request, res: Response) => {
    if (req.params.id) {
      const id = +req.params.id;
      res.send(await this.services.findOne(id));
      return;
    } else {
      res.status(500).send('Missing parameter!');
    }
  };

  public create = async (req: Request, res: Response) => {
    const objIn: ConhecimentoEntity = req.body;
    res.send(this.services.create(objIn));
  };

  public update = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const objIn: ConhecimentoEntity = req.body;
    res.send(await this.services.update(id, objIn));
  };

  public delete = async (req: Request, res: Response) => {
    const id = +req.params.id;
    res.send(this.services.delete(id));
  };

  public routes() {
    this.router.get('/', this.findAll);
    this.router.get('/:id/', this.findOne);
    this.router.post('/', this.create);
    this.router.put('/:id/', this.update);
    this.router.delete('/:id/', this.delete);
  }
}
