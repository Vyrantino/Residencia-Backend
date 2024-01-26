/// <reference types="node" />
/// <reference types="multer" />
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Documentos } from './entities/documento.entity';
import { Repository } from 'typeorm';
import { Plantilla } from 'src/plantillas/entities/plantilla.entity';
import { GetDocumentoDto } from './dto/get-documento.dto';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class DocumentosService {
    private documentosRepository;
    private plantillaRepository;
    constructor(documentosRepository: Repository<Documentos>, plantillaRepository: Repository<Plantilla>);
    retrieveDocument(idDocumento: number): Promise<{
        buffer: Buffer;
        nombre: string;
    }>;
    download(documento: GetDocumentoDto): Promise<Documentos | null>;
    uploadDocument(documento: Express.Multer.File, idUsuario: number): Promise<any>;
    update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findUserDocumentos(idUsuario: number, options: IPaginationOptions): Promise<Pagination<Documentos>>;
    pageCount(idUsuario: number): Promise<number>;
}
