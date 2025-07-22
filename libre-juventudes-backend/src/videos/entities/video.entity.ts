import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entidad Video que representa una tabla en PostgreSQL
 */
@Entity()
export class Video {
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
