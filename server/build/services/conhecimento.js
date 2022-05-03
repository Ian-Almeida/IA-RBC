"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conhecimento_1 = require("../entities/conhecimento");
const database_1 = __importDefault(require("../database"));
// Classe service para fazer a comuinicação com o banco
class ConhecimentoService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            // Busca todos refente a tabela da entidade
            return yield this.repository.find();
        });
        this.findOne = (id) => __awaiter(this, void 0, void 0, function* () {
            // Buscas um de acordo com o id
            return yield this.repository.findOne({ where: { id: id } });
        });
        this.create = (objIn) => __awaiter(this, void 0, void 0, function* () {
            // Cria um registro a partir do parametro que veio do controller
            return yield this.repository.save(objIn);
        });
        // TODO
        this.update = (id, objIn) => {
            return 'Update from service';
        };
        // TODO
        this.delete = (id) => {
            return 'Delete from service';
        };
        // TODO
        this.scores = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.db.query('SELECT * FROM conhecimento_entity');
            return result;
        });
        // Instancia o repositorio referente a entidade
        // Serve como facilitador para realizar operações com o banco de dados
        this.repository = database_1.default.db.getRepository(conhecimento_1.ConhecimentoEntity);
    }
}
exports.default = ConhecimentoService;
