import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConhecimentoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idade: number;

    @Column()
    periodo: number;

    @Column()
    generoFavorito: string;
    
    @Column()
    estado: string;

    @Column()
    horasDisponiveis: number;
}
