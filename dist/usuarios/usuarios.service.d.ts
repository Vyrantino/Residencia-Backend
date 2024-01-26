import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class UsuariosService {
    private usuariosRepository;
    private jwtService;
    constructor(usuariosRepository: Repository<Usuarios>, jwtService: JwtService);
    register(usuario: CreateUsuarioDto): Promise<Usuarios>;
    login(usuario: LoginDto): Promise<{
        idUsuario: number;
        NombreUsuario: string;
        Rol: string;
        token: string;
    }>;
    findAll(): Promise<Usuarios[]>;
    findAllMaster(): Promise<Usuarios[]>;
    findOne(id: number): Promise<Usuarios | null>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
