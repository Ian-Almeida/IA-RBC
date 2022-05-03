import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Classe entidade para mapear as colunas e tambem serve como schema
@Entity()
export class ConhecimentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  idade: number;

  @Column({ nullable: true })
  periodo: number;

  @Column({ nullable: true })
  generoFavorito: string;

  @Column({ nullable: true })
  filmeSerie: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  tempoDisponivel: string;
}
