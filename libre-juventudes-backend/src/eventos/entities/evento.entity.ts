import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entidad Evento que representa la tabla "evento" en PostgreSQL.
 * Incluye:
 * - título y descripción obligatorios
 * - fecha del evento (tipo Date)
 * - lugar opcional
 * - fecha de creación automática (creadoEn)
 */
@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descripcion!: string;

  // Se espera que esta fecha se convierta explícitamente en Date en el servicio
  @Column()
  fecha!: Date;

  @Column({ nullable: true })
  lugar?: string;

  @CreateDateColumn()
  creadoEn!: Date;
}
