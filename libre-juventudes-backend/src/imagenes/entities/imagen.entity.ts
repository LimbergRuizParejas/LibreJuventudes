import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * La entidad `Imagen` representa un recurso de imagen cargado en el sistema.
 * - `titulo`: título descriptivo de la imagen.
 * - `url`: nombre del archivo almacenado en el servidor.
 * - `descripcion`: texto opcional que acompaña la imagen.
 * - `creadoEn`: fecha automática de creación.
 */
@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  titulo!: string;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'creado_en' })
  creadoEn!: Date;
}
