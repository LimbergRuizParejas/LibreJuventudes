import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entidad Publicacion que representa la tabla publicaciones en PostgreSQL
 */
@Entity()
export class Publicacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  contenido!: string;

  @Column({ nullable: true })
  categoria!: string;

  @CreateDateColumn()
  creadoEn!: Date;
}
