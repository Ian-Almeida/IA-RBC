import { DataSource } from "typeorm";

import * as path from "path"
import { ConhecimentoEntity } from "./entities/conhecimento";

export class DatabaseConfig {
    public rootDir = path.resolve(__dirname);

    public db = this.getDB();

    public getDB() {
        return new DataSource({
            type: "sqlite",
            database: `${this.rootDir}/../src/db.sqlite`,
            entities: [ConhecimentoEntity],
            // migrationsTableName: "custom_migration_table",
            // migrations: [`${this.rootDir}/migration/*.js`],
            logging: true,
        });;
    }
}

export default new DatabaseConfig();