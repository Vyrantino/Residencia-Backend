/// <reference types="multer" />
import { DocumentosService } from './documentos.service';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Response } from 'express';
import { GetDocumentoDto } from './dto/get-documento.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Documentos } from './entities/documento.entity';
export declare class DocumentosController {
    private readonly documentosService;
    constructor(documentosService: DocumentosService);
    getPages(idUsuario: number): Promise<number>;
    retrieveDocument(idDocumento: number, res: Response): Promise<Response<any, Record<string, any>>>;
    download(getDocumento: GetDocumentoDto, res: Response): Promise<void>;
    getUserDocumentos(idUsuario: number, page?: number, limit?: number): Promise<Pagination<Documentos>>;
    update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    uploadFile(file: Express.Multer.File, idUsuario: number): Promise<any>;
}
