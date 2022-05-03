import { Repository } from "typeorm";
import { ConhecimentoEntity } from "../entities/conhecimento";
import DatabaseConfig from "../database";

export default class ConhecimentoService {
    private repository: Repository<ConhecimentoEntity>;

    constructor() {
        this.repository = DatabaseConfig.db.getRepository(ConhecimentoEntity);
    }

    public index = async () => {
        return await this.repository.find();
        return "Index from service";
    }

    public create = async () => {
        const obj = new ConhecimentoEntity();
        obj.estado = 'SC';
        obj.generoFavorito = 'Aventura';
        obj.horasDisponiveis = 2.3;
        obj.idade = 12;
        obj.periodo = 1;

        await this.repository.save(obj);
        return "Create from service";
    }

    public update = () => {
        return "Update from service";
    }

    public delete = () => {
        return "Delete from service";
    }
}