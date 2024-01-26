import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginDto } from './dto/login.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    registerUser(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuarios>;
    loginUser(user: LoginDto): Promise<{
        idUsuario: number;
        NombreUsuario: string;
        Rol: string;
        token: string;
    }>;
    findAll(): Promise<import("./entities/usuario.entity").Usuarios[]>;
    findOne(id: number): Promise<import("./entities/usuario.entity").Usuarios>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
