import { Repository } from 'typeorm';
import { ConhecimentoEntity } from '../entities/conhecimento';
import DatabaseConfig from '../database';

export default class ConhecimentoService {
  private repository: Repository<ConhecimentoEntity>;

  constructor() {
    this.repository = DatabaseConfig.db.getRepository(ConhecimentoEntity);
  }

  public findAll = async () => {
    return await this.repository.find();
  };

  public findOne = async (id: number) => {
    return await this.repository.findOne({ where: { id: id } });
  };

  public create = async (objIn: ConhecimentoEntity) => {
    return await this.repository.save(objIn);
  };

  public update = (id: number, objIn: ConhecimentoEntity) => {
    return 'Update from service';
  };

  public delete = (id: number) => {
    return 'Delete from service';
  };
}
