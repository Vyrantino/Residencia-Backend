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
exports.PlantillasController = void 0;
const common_1 = require("@nestjs/common");
const plantillas_service_1 = require("./plantillas.service");
const create_plantilla_dto_1 = require("./dto/create-plantilla.dto");
const update_plantilla_dto_1 = require("./dto/update-plantilla.dto");
let PlantillasController = class PlantillasController {
    constructor(plantillasService) {
        this.plantillasService = plantillasService;
    }
    create(createPlantillaDto) {
        return this.plantillasService.create(createPlantillaDto);
    }
    getPages() {
        return this.plantillasService.pageCount();
    }
    paginatedPlantillas(page = 1, limit = 3) {
        limit = limit > 100 ? 100 : limit;
        return this.plantillasService.findAllPaginated({
            page,
            limit,
        });
    }
    findAll() {
        return this.plantillasService.findAll();
    }
    findOne(id) {
        return this.plantillasService.findOne(+id);
    }
    findBy(idUsuario) {
        return this.plantillasService.findBy(idUsuario);
    }
    update(id, updatePlantillaDto) {
        return this.plantillasService.update(+id, updatePlantillaDto);
    }
    remove(id) {
        return this.plantillasService.remove(id);
    }
};
exports.PlantillasController = PlantillasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plantilla_dto_1.CreatePlantillaDto]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pagecount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "getPages", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(3), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlantillasController.prototype, "paginatedPlantillas", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('idUsuario/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "findBy", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plantilla_dto_1.UpdatePlantillaDto]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantillasController.prototype, "remove", null);
exports.PlantillasController = PlantillasController = __decorate([
    (0, common_1.Controller)('plantillas'),
    __metadata("design:paramtypes", [plantillas_service_1.PlantillasService])
], PlantillasController);
//# sourceMappingURL=plantillas.controller.js.map