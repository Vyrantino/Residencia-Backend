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
exports.DocumentosController = void 0;
const common_1 = require("@nestjs/common");
const documentos_service_1 = require("./documentos.service");
const update_documento_dto_1 = require("./dto/update-documento.dto");
const fs = require("fs");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const get_documento_dto_1 = require("./dto/get-documento.dto");
let DocumentosController = class DocumentosController {
    constructor(documentosService) {
        this.documentosService = documentosService;
    }
    getPages(idUsuario) {
        return this.documentosService.pageCount(idUsuario);
    }
    async retrieveDocument(idDocumento, res) {
        const result = await this.documentosService.retrieveDocument(idDocumento);
        if (!result) {
            return res.status(404).send('Documento no encontrado');
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename=${result.nombre}`);
        res.send(result.buffer);
    }
    async download(getDocumento, res) {
        const buf = await this.documentosService.download(getDocumento);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename=${getDocumento.nombreDocumento}`);
        res.send(buf);
    }
    async getUserDocumentos(idUsuario, page = 1, limit = 3) {
        limit = limit > 100 ? 100 : limit;
        return this.documentosService.findUserDocumentos(idUsuario, {
            page,
            limit,
        });
    }
    update(id, updateDocumentoDto) {
        return this.documentosService.update(+id, updateDocumentoDto);
    }
    remove(id) {
        return this.documentosService.remove(+id);
    }
    async uploadFile(file, idUsuario) {
        try {
            return this.documentosService.uploadDocument(file, idUsuario);
        }
        catch (error) {
            console.error(error);
            console.log('ocurrio un error!');
        }
    }
};
exports.DocumentosController = DocumentosController;
__decorate([
    (0, common_1.Get)('pagecount/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "getPages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentosController.prototype, "retrieveDocument", null);
__decorate([
    (0, common_1.Post)('download'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_documento_dto_1.GetDocumentoDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentosController.prototype, "download", null);
__decorate([
    (0, common_1.Get)('idUsuario/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DocumentosController.prototype, "getUserDocumentos", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_documento_dto_1.UpdateDocumentoDto]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocumentosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('documento', {
        storage: (0, multer_1.diskStorage)({
            destination: function (req, file, cb) {
                const usuario = req.body.usuario || '';
                const baseDirectory = './DirectorioPlantillas';
                const directoryPath = path.join(baseDirectory);
                if (!fs.existsSync(directoryPath)) {
                    fs.mkdirSync(directoryPath, { recursive: true });
                }
                cb(null, directoryPath);
            },
            filename: function (res, file, cb) {
                cb(null, file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(doc|docx|)' }),
        ],
    }))),
    __param(1, (0, common_1.Body)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DocumentosController.prototype, "uploadFile", null);
exports.DocumentosController = DocumentosController = __decorate([
    (0, common_1.Controller)('documentos'),
    __metadata("design:paramtypes", [documentos_service_1.DocumentosService])
], DocumentosController);
//# sourceMappingURL=documentos.controller.js.map