import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Enumeración de roles válidos para los usuarios del sistema
 */
export enum RolUsuario {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

/**
 * Entidad que representa un usuario del sistema.
 * Se mapea a la tabla 'user' en la base de datos.
 */
@Entity('user') // se especifica el nombre de la tabla explícitamente
export class User {
  /**
   * Identificador único del usuario (clave primaria, autoincremental)
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Nombre completo del usuario
   */
  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  /**
   * Correo electrónico único del usuario
   */
  @Column({ type: 'varchar', unique: true })
  email!: string;

  /**
   * Contraseña hasheada del usuario
   */
  @Column({ type: 'varchar' })
  password!: string;

  /**
   * Rol del usuario dentro del sistema: 'admin' o 'usuario'
   */
  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.USUARIO,
  })
  rol!: RolUsuario;

  /**
   * Ubicación geográfica del usuario (opcional)
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  ubicacion?: string;

  /**
   * URL o ruta de la imagen de perfil del usuario (opcional)
   */
  @Column({ type: 'varchar', nullable: true })
  imagen?: string;

  /**
   * Fecha y hora de creación del usuario (generada automáticamente)
   */
  @CreateDateColumn({ type: 'timestamp' })
  creadoEn!: Date;
}
