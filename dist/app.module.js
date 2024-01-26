"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const plantillas_module_1 = require("./plantillas/plantillas.module");
const documentos_module_1 = require("./documentos/documentos.module");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./usuarios/entities/usuario.entity");
const plantilla_entity_1 = require("./plantillas/entities/plantilla.entity");
const documento_entity_1 = require("./documentos/entities/documento.entity");
const axios_1 = require("@nestjs/axios");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const host = process.env.HOST || 'localhost';
const password = process.env.BDPW;
const usuario = process.env.BDUS;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'SCGGOCCITD/'),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: host,
                port: 3306,
                username: usuario,
                password: password,
                database: 'oficios',
                entities: [
                    usuario_entity_1.Usuarios,
                    plantilla_entity_1.Plantilla,
                    documento_entity_1.Documentos,
                    axios_1.HttpModule
                ],
                synchronize: false,
            }),
            usuarios_module_1.UsuariosModule, plantillas_module_1.PlantillasModule, documentos_module_1.DocumentosModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map