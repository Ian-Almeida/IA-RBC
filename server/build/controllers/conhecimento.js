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
class ConhecimentoController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // res.send('Conhecimento Index')
            res.send(yield this.services.index());
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // res.send('Conhecimento Create')
            res.send(this.services.create());
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // res.send('Conhecimento Update')
            res.send(this.services.update());
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // res.send('Conhecimento Delete')
            res.send(this.services.delete());
        });
        this.router = (0, express_1.Router)();
        this.services = new conhecimento_1.default();
        this.routes();
    }
    routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
exports.default = ConhecimentoController;
