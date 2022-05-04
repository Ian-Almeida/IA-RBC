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
const express_1 = require("express");
const conhecimento_1 = __importDefault(require("../services/conhecimento"));
const lodash_1 = __importDefault(require("lodash"));
class ConhecimentoController {
    constructor() {
        this.idade_peso = 0.6;
        this.periodo_peso = 0.4;
        this.genero_favorito_peso = 1;
        this.estado_peso = 0.3;
        this.horas_disponiveis_peso = 0.9;
        // Endpoint para o buscar todos, chama o service que faz essa busca no banco
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.services.findAll());
        });
        // Endpoint para o buscar um, chama o service que faz essa busca no banco
        this.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Pega um parametro de caminho da URL e chama o service que faz o buscar um no banco
            if (req.params.id) {
                const id = +req.params.id;
                res.send(yield this.services.findOne(id));
                return;
            }
            else {
                res.status(500).send('Missing parameter!');
            }
        });
        this.recomendar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const objIn = req.body;
            const conhecimento = yield this.services.findAll();
            let itensCalculados = [];
            conhecimento.forEach((item) => {
                let score = 0;
                const TempoDisponivel = (tempo) => {
                    const splittedTempo = tempo.split(':');
                    const horas = +splittedTempo[0];
                    const minutos = +splittedTempo[1];
                    return (horas * 60) + minutos;
                };
                if ((item.idade > objIn.idade - 3) && (item.idade < objIn.idade + 3)) {
                    score = score + (this.idade_peso * 1);
                }
                if (item.periodo === objIn.periodo) {
                    score = score + (this.periodo_peso * 1);
                }
                if (item.generoFavorito === objIn.generoFavorito) {
                    score = score + (this.genero_favorito_peso * 1);
                }
                if (item.estado === objIn.estado) {
                    score = score + (this.estado_peso * 1);
                }
                if (TempoDisponivel(item.tempoDisponivel) <= TempoDisponivel(objIn.tempoDisponivel)) {
                    score = score + (this.horas_disponiveis_peso * 1);
                }
                itensCalculados.push({ score: +score.toFixed(2), filmeSerie: item.filmeSerie });
            });
            const itensOrdenados = lodash_1.default.orderBy(itensCalculados, ['score'], ['desc']);
            res.send(itensOrdenados.splice(0, 3));
        });
        // Endpoint que cria um registro de acordo com o que foi passado pelo body da requisição
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const objIn = req.body;
            res.send(this.services.create(objIn));
        });
        // TODO
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const objIn = req.body;
            res.send(yield this.services.update(id, objIn));
        });
        // TODO
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            res.send(this.services.delete(id));
        });
        this.router = (0, express_1.Router)();
        this.services = new conhecimento_1.default();
        this.routes();
    }
    // Método que insere as rotas nesse pedaço de router, para ser plugado no app express
    routes() {
        this.router.post('/recomendar/', this.recomendar);
        this.router.get('/', this.findAll);
        this.router.get('/:id/', this.findOne);
        this.router.post('/', this.create);
        this.router.put('/:id/', this.update);
        this.router.delete('/:id/', this.delete);
    }
}
exports.default = ConhecimentoController;
