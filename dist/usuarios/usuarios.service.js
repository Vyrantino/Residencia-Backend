"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
let UsuariosService = class UsuariosService {
    constructor(usuariosRepository, jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.jwtService = jwtService;
    }
    async register(usuario) {
        const { Contraseña } = usuario;
        const plainToHash = await (0, bcrypt_1.hash)(Contraseña, 10);
        usuario = { ...usuario, Contraseña: plainToHash };
        const newUsuario = this.usuariosRepository.create(usuario);
        return this.usuariosRepository.save(newUsuario);
    }
    async login(usuario) {
        const { NombreUsuario, Contraseña } = usuario;
        const findUser = await this.usuariosRepository.findOne({ where: { NombreUsuario } });
        if (!findUser)
            throw new common_1.HttpException('Usuario no se encontró', 404);
        const checkPassword = await (0, bcrypt_1.compare)(Contraseña, findUser.Contraseña);
        if (!checkPassword)
            throw new common_1.HttpException('Contraseña Incorrecta ', 403);
        const payload = { idUsuario: findUser.idUsuario, NombreUsuario: findUser.NombreUsuario };
        const token = this.jwtService.sign(payload);
        const data = {
            idUsuario: findUser.idUsuario,
            NombreUsuario: findUser.NombreUsuario,
            Rol: findUser.Rol,
            token: token
        };
        return data;
    }
    findAll() {
        return this.usuariosRepository.find({ where: { Rol: 'Usuario' } });
    }
    findAllMaster() {
        return this.usuariosRepository.find();
    }
    findOne(id) {
        return this.usuariosRepository.findOneBy({ idUsuario: id });
    }
    async update(id, updateUsuarioDto) {
        try {
            if (updateUsuarioDto.Contraseña) {
                const { Contraseña } = updateUsuarioDto;
                const plainToHash = await (0, bcrypt_1.hash)(Contraseña, 10);
                updateUsuarioDto = { ...updateUsuarioDto, Contraseña: plainToHash };
                return this.usuariosRepository.update({ idUsuario: id }, updateUsuarioDto);
            }
            else {
                return this.usuariosRepository.update({ idUsuario: id }, updateUsuarioDto);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    remove(id) {
        return this.usuariosRepository.delete(id);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuarios)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map