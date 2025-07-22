import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entidad Imagen que representa una tabla en PostgreSQL.
 */
@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  descripcion?: string;

  @CreateDateColumn()
  creadoEn!: Date;
}
