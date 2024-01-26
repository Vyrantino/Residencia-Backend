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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
const class_validator_1 = require("class-validator");
const documento_entity_1 = require("../../documentos/entities/documento.entity");
const plantilla_entity_1 = require("../../plantillas/entities/plantilla.entity");
const typeorm_1 = require("typeorm");
let Usuarios = class Usuarios {
};
exports.Usuarios = Usuarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuarios.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 16 }),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], Usuarios.prototype, "NombreUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Usuarios.prototype, "Contrase\u00F1a", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: 'Usuario' }),
    __metadata("design:type", String)
], Usuarios.prototype, "Rol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documento_entity_1.Documentos, (documentos) => documentos.usuario, { cascade: true }),
    __metadata("design:type", Array)
], Usuarios.prototype, "documentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plantilla_entity_1.Plantilla, (plantilla) => plantilla.usuario, { cascade: true }),
    __metadata("design:type", Array)
], Usuarios.prototype, "plantilla", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['NombreUsuario'])
], Usuarios);
//# sourceMappingURL=usuario.entity.js.map