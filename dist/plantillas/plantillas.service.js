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
exports.PlantillasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plantilla_entity_1 = require("./entities/plantilla.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const docx_1 = require("docx");
const path = require("path");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
let PlantillasService = class PlantillasService {
    constructor(plantillaRepository) {
        this.plantillaRepository = plantillaRepository;
    }
    async create(plantilla) {
        const doc = new docx_1.Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new docx_1.Paragraph({
                            children: [
                                new docx_1.TextRun(" Instituto Tecnologico {Nombre} {Apellido} {CURP}"),
                                new docx_1.TextRun({
                                    text: "" + plantilla.Nombre + "",
                                    bold: true,
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });
        const currentTime = new Date();
        const formatedCurrentTime = currentTime.toISOString();
        plantilla.FechaModificacion = formatedCurrentTime;
        const newPlantilla = this.plantillaRepository.create(plantilla);
        return this.plantillaRepository.save(newPlantilla);
    }
    findAll() {
        return this.plantillaRepository.find({
            relations: {
                usuario: true
            }
        });
    }
    findAllPaginated(options) {
        const plantillas = this.plantillaRepository
            .createQueryBuilder('plantillas')
            .leftJoinAndSelect('plantillas.usuario', 'usuario')
            .select([
            'plantillas.idPlantilla',
            'plantillas.Nombre',
            'plantillas.FechaModificacion',
            'plantillas.Route',
            'usuario.idUsuario',
            'usuario.NombreUsuario',
        ]);
        return (0, nestjs_typeorm_paginate_1.paginate)(plantillas, options);
    }
    async findOne(id) {
        const InspectModule = require("docxtemplater/js/inspect-module.js");
        const iModule = InspectModule();
        const plantilla = await this.plantillaRepository.findOne({ where: { idPlantilla: id } });
        const pathToDocument = path.resolve(plantilla.Route);
        const leerArchivo = fs.readFileSync(pathToDocument, 'binary');
        const zip = new PizZip(leerArchivo);
        const doc = new Docxtemplater(zip, { modules: [iModule] });
        const tags = iModule.getAllTags();
        return tags;
    }
    findBy(idUsuario) {
        return this.plantillaRepository.find({
            select: {
                idPlantilla: true,
                idUsuario: true,
                Nombre: true
            },
            relations: {
                usuario: true
            },
            where: {
                idUsuario: idUsuario
            }
        });
    }
    update(id, updatePlantillaDto) {
        const splitRoute = updatePlantillaDto.Route.split("/");
        const popOldName = splitRoute.pop();
        splitRoute.push(updatePlantillaDto.Nombre);
        const newRoute = splitRoute.join('/');
        updatePlantillaDto.Route = newRoute;
        return this.plantillaRepository.update({ idPlantilla: id }, updatePlantillaDto);
    }
    async remove(id) {
        try {
            const plantilla = await this.plantillaRepository.findOneBy({ idPlantilla: id });
            if (!fs.existsSync(plantilla.Route)) {
                return null;
            }
            fs.unlinkSync(plantilla.Route);
            return this.plantillaRepository.delete(id);
        }
        catch (error) {
        }
    }
    async pageCount() {
        const result = await this.plantillaRepository.count();
        let division = result / 3;
        let decimal = (division % 1) * 10;
        let pageCount = Math.round(result / 3);
        if (decimal === 0)
            pageCount = pageCount;
        else if (decimal < 5)
            pageCount = pageCount + 1;
        else
            pageCount = pageCount;
        return pageCount;
    }
};
exports.PlantillasService = PlantillasService;
exports.PlantillasService = PlantillasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plantilla_entity_1.Plantilla)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlantillasService);
//# sourceMappingURL=plantillas.service.js.map