import { Router, Response, Request } from 'express';
import { ConhecimentoEntity } from '../entities/conhecimento';
import ConhecimentoService from '../services/conhecimento';
import _ from 'lodash';

export default class ConhecimentoController {
  // Instacia do router para plugar ao app express
  public router: Router;
  // Instancia dos services para chamar nos endpoints
  private services: ConhecimentoService;

  public idade_peso = 0.6
  public periodo_peso = 0.4
  public genero_favorito_peso = 1
  public estado_peso = 0.3
  public horas_disponiveis_peso = 0.9

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

  public recomendar = async (req: Request, res: Response) => {
    const objIn: ConhecimentoEntity = req.body;
    const conhecimento = await this.services.findAll();
    let itensCalculados: {score: number, filmeSerie: string}[] = [];
    conhecimento.forEach((item) => {
      let score = 0;
      const TempoDisponivel = (tempo: string) => {
        const splittedTempo = tempo.split(':');
        const horas = +splittedTempo[0];
        const minutos = +splittedTempo[1];
        return (horas*60)+minutos;
      }
      if((item.idade > objIn.idade - 3) && (item.idade < objIn.idade + 3)) {
        score = score + (this.idade_peso*1);
      }
      if(item.periodo === objIn.periodo) {
        score = score + (this.periodo_peso*1);
      }
      if(item.generoFavorito === objIn.generoFavorito) {
        score = score + (this.genero_favorito_peso*1);
      }
      if(item.estado === objIn.estado) {
        score = score + (this.estado_peso*1);
      }
      if(TempoDisponivel(item.tempoDisponivel) <= TempoDisponivel(objIn.tempoDisponivel)) {
        score = score + (this.horas_disponiveis_peso*1);
      }
      itensCalculados.push({score: +score.toFixed(2), filmeSerie: item.filmeSerie});
    });
    const itensOrdenados = _.orderBy(itensCalculados, ['score'], ['desc']);
    res.send(itensOrdenados.splice(0, 3));
  }

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
    this.router.post('/recomendar/', this.recomendar)
    this.router.get('/', this.findAll);
    this.router.get('/:id/', this.findOne);
    this.router.post('/', this.create);
    this.router.put('/:id/', this.update);
    this.router.delete('/:id/', this.delete);
  }
}
