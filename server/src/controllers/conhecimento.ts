import { Router, Response, Request } from 'express';
import { ConhecimentoEntity } from '../entities/conhecimento';
import ConhecimentoService from '../services/conhecimento';

export default class ConhecimentoController {
  // Instacia do router para plugar ao app express
  public router: Router;
  // Instancia dos services para chamar nos endpoints
  private services: ConhecimentoService;

  constructor() {
    this.router = Router();
    this.services = new ConhecimentoService();
    this.routes();
  }

  // Endpoint para o buscar todos, chama o service que faz essa busca no banco
  public findAll = async (req: Request, res: Response) => {
    res.send(await this.services.findAll());
  };

  // Endpoint para o buscar um, chama o service que faz essa busca no banco
  public findOne = async (req: Request, res: Response) => {
    // Pega um parametro de caminho da URL e chama o service que faz o buscar um no banco
    if (req.params.id) {
      const id = +req.params.id;
      res.send(await this.services.findOne(id));
      return;
    } else {
      res.status(500).send('Missing parameter!');
    }
  };

  // Endpoint que cria um registro de acordo com o que foi passado pelo body da requisição
  public create = async (req: Request, res: Response) => {
    const objIn: ConhecimentoEntity = req.body;
    res.send(this.services.create(objIn));
  };

  // TODO
  public update = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const objIn: ConhecimentoEntity = req.body;
    res.send(await this.services.update(id, objIn));
  };
  // TODO
  public delete = async (req: Request, res: Response) => {
    const id = +req.params.id;
    res.send(this.services.delete(id));
  };

  // Método que insere as rotas nesse pedaço de router, para ser plugado no app express
  public routes() {
    this.router.get('/', this.findAll);
    this.router.get('/:id/', this.findOne);
    this.router.post('/', this.create);
    this.router.put('/:id/', this.update);
    this.router.delete('/:id/', this.delete);
  }
}
