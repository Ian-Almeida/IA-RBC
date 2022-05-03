"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers"));
class ServerConfig {
    constructor() {
        this.app = (0, express_1.default)();
        this.defaultPath = '/api';
        this.configuration();
        this.routes();
    }
    configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }
    routes() {
        this.app.use(`${this.defaultPath}/conhecimento`, controllers_1.default.conhecimento.router);
        this.app.get('/', (req, res) => {
            res.send("Hello World");
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening port ${this.app.get('port')} port.`);
        });
    }
}
exports.ServerConfig = ServerConfig;
