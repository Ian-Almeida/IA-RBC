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
class ConhecimentoService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
            return "Index from service";
        });
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            const obj = new conhecimento_1.ConhecimentoEntity();
            obj.estado = 'SC';
            obj.generoFavorito = 'Aventura';
            obj.horasDisponiveis = 2.3;
            obj.idade = 12;
            obj.periodo = 1;
            yield this.repository.save(obj);
            return "Create from service";
        });
        this.update = () => {
            return "Update from service";
        };
        this.delete = () => {
            return "Delete from service";
        };
        this.repository = database_1.default.db.getRepository(conhecimento_1.ConhecimentoEntity);
    }
}
exports.default = ConhecimentoService;
