"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const typeorm_1 = require("typeorm");
const path = __importStar(require("path"));
const conhecimento_1 = require("./entities/conhecimento");
class DatabaseConfig {
    constructor() {
        // Encontra a rota atual da aplicação
        this.rootDir = path.resolve(__dirname);
        // Instancia do banco de dados para acessar na aplicação. A mesma é inicializada no app.ts
        this.db = this.getDB();
    }
    getDB() {
        // Função que retorna uma instancia do banco de dados de acordo com as configurações
        return new typeorm_1.DataSource({
            type: 'sqlite',
            database: `${this.rootDir}/../src/db.sqlite`,
            entities: [conhecimento_1.ConhecimentoEntity],
            logging: true,
        });
    }
}
exports.DatabaseConfig = DatabaseConfig;
exports.default = new DatabaseConfig();
