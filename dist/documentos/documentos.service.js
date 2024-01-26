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
exports.DocumentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documento_entity_1 = require("./entities/documento.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
const plantilla_entity_1 = require("../plantillas/entities/plantilla.entity");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let DocumentosService = class DocumentosService {
    constructor(documentosRepository, plantillaRepository) {
        this.documentosRepository = documentosRepository;
        this.plantillaRepository = plantillaRepository;
    }
    async retrieveDocument(idDocumento) {
        const documento = await this.documentosRepository.findOneBy({ idDocumento: idDocumento });
        const leerArchivo = fs.readFileSync(documento.Route);
        return { buffer: leerArchivo, nombre: documento.Nombre };
    }
    async download(documento) {
        try {
            if (!fs.existsSync('./DirectorioPlantillas')) {
                fs.mkdirSync('./DirectorioPlantillas', { recursive: true });
            }
            const pathToDocument = path.join("./DirectorioPlantillas", documento.nombreArchivo);
            const leerArchivo = fs.readFileSync(pathToDocument, "binary");
            const zip = new PizZip(leerArchivo);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.render(documento.renderData);
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });
            const plantilla = await this.plantillaRepository.findOne({ where: { Route: pathToDocument } });
            const currentTime = new Date();
            const formatedCurrentTime = currentTime.toISOString();
            const serverPath = path.join('./DirectorioUsuarios', documento.NombreUsuario, 'Documentos');
            if (!fs.existsSync(serverPath)) {
                fs.mkdirSync(serverPath, { recursive: true });
            }
            const split = documento.nombreDocumento.split('.');
            const nombreDocumento = split[0];
            const routeDocumento = path.join(serverPath, `${nombreDocumento}.docx`);
            fs.writeFileSync(routeDocumento, buf);
            const registroDocumento = {
                Nombre: documento.nombreDocumento,
                FechaModificacion: formatedCurrentTime,
                nombrePlantilla: plantilla.Nombre,
                idUsuario: documento.idUsuario,
                Route: routeDocumento
            };
            const createRegistroDocumento = this.documentosRepository.create(registroDocumento);
            const registrarDocumento = await this.documentosRepository.save(createRegistroDocumento);
            return buf;
        }
        catch (e) {
            console.log(e);
        }
    }
    async uploadDocument(documento, idUsuario) {
        const InspectModule = require("docxtemplater/js/inspect-module.js");
        const iModule = InspectModule();
        const pathToDocument = path.resolve(documento.path);
        const leerArchivo = fs.readFileSync(pathToDocument, 'binary');
        const zip = new PizZip(leerArchivo);
        const doc = new Docxtemplater(zip, { modules: [iModule] });
        const tags = iModule.getAllTags();
        const splitNombreArchivo = documento.filename.split('.');
        const nombreArchivo = splitNombreArchivo[0];
        const currentTime = new Date();
        const formatedCurrentTime = currentTime.toISOString();
        const plantilla = {
            Nombre: nombreArchivo,
            FechaModificacion: formatedCurrentTime,
            Route: documento.path,
            idUsuario: idUsuario
        };
        const registrarPlantilla = this.plantillaRepository.create(plantilla);
        const plantillaRegistrada = await this.plantillaRepository.save(registrarPlantilla);
        return tags;
    }
    update(id, updateDocumentoDto) {
        return this.documentosRepository.update({ idDocumento: id }, updateDocumentoDto);
    }
    async remove(id) {
        const documento = await this.documentosRepository.findOneBy({ idDocumento: id });
        if (!fs.existsSync(documento.Route)) {
            return null;
        }
        fs.unlinkSync(documento.Route);
        return this.documentosRepository.delete(id);
    }
    async findUserDocumentos(idUsuario, options) {
        const documentos = this.documentosRepository
            .createQueryBuilder('documentos')
            .select(['documentos.idDocumento', 'documentos.Nombre', 'documentos.FechaModificacion'])
            .where('documentos.idUsuario = :idUsuario', { idUsuario });
        return (0, nestjs_typeorm_paginate_1.paginate)(documentos, options);
    }
    async pageCount(idUsuario) {
        const result = await this.documentosRepository.count({ where: { idUsuario: idUsuario } });
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
exports.DocumentosService = DocumentosService;
exports.DocumentosService = DocumentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documento_entity_1.Documentos)),
    __param(1, (0, typeorm_1.InjectRepository)(plantilla_entity_1.Plantilla)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentosService);
//# sourceMappingURL=documentos.service.js.map