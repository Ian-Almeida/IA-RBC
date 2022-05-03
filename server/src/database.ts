import { DataSource } from 'typeorm';

import * as path from 'path';
import { ConhecimentoEntity } from './entities/conhecimento';

export class DatabaseConfig {
  // Encontra a rota atual da aplicação
  public rootDir = path.resolve(__dirname);
  // Instancia do banco de dados para acessar na aplicação. A mesma é inicializada no app.ts
  public db = this.getDB();

  public getDB() {
    // Função que retorna uma instancia do banco de dados de acordo com as configurações
    return new DataSource({
      type: 'sqlite',
      database: `${this.rootDir}/../src/db.sqlite`,
      entities: [ConhecimentoEntity],
      logging: true,
    });
  }
}

export default new DatabaseConfig();
