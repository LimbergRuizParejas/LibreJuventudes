import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, RolUsuario } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const nuevoUsuario = this.userRepository.create({
      ...createUserDto,
      rol: RolUsuario.USUARIO, // asigna rol por defecto si no se envía
    });
    return await this.userRepository.save(nuevoUsuario);
  }

  /**
   * Devuelve todos los usuarios
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Busca un usuario por ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  /**
   * Busca un usuario por email
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }

  /**
   * Actualiza el rol de un usuario
   */
  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<User> {
    const user = await this.findOne(id);

    const nuevoRol = updateRoleDto.rol as RolUsuario;

    if (!Object.values(RolUsuario).includes(nuevoRol)) {
      throw new BadRequestException(`Rol no válido: ${updateRoleDto.rol}`);
    }

    user.rol = nuevoRol;
    return await this.userRepository.save(user);
  }
}
