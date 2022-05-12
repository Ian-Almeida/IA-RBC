import { Repository } from 'typeorm';
import { ConhecimentoEntity } from '../entities/conhecimento';
import DatabaseConfig from '../database';

// Classe service para fazer a comuinicação com o banco
export default class ConhecimentoService {
  private repository: Repository<ConhecimentoEntity>;

  constructor() {
    // Instancia o repositorio referente a entidade
    // Serve como facilitador para realizar operações com o banco de dados
    this.repository = DatabaseConfig.db.getRepository(ConhecimentoEntity);
  }

  public findAll = async () => {
    // Busca todos refente a tabela da entidade
    return await this.repository.find();
  };

  public findOne = async (id: number) => {
    // Buscas um de acordo com o id
    return await this.repository.findOne({ where: { id: id } });
  };

  public create = async (objIn: ConhecimentoEntity) => {
    // Cria um registro a partir do parametro que veio do controller
    return await this.repository.save(objIn);
  };

  // TODO
  public update = (id: number, objIn: ConhecimentoEntity) => {
    return 'Update from service';
  };

  // TODO
  public delete = async (id: number) => {
    return await this.repository.delete(id);
  };
}
