import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentos } from './entities/documento.entity';
import {  Repository } from 'typeorm';
import * as fs from 'fs' ;
import * as path from 'path' ;
import { Plantilla } from 'src/plantillas/entities/plantilla.entity';
import { GetDocumentoDto } from './dto/get-documento.dto';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
import { paginate , Pagination , IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository( Documentos )
    private documentosRepository: Repository< Documentos >,
    @InjectRepository( Plantilla )
    private plantillaRepository: Repository< Plantilla >,

  ){}

  async retrieveDocument( idDocumento: number ): Promise< { buffer: Buffer, nombre: string } >{
    const documento = await this.documentosRepository.findOneBy( { idDocumento: idDocumento } ) ;
    const leerArchivo = fs.readFileSync( documento.Route ) ;
    return { buffer: leerArchivo, nombre: documento.Nombre };
  }

  async download( documento: GetDocumentoDto ): Promise < Documentos | null > {
    try{
        if (!fs.existsSync('./DirectorioPlantillas')) {
          fs.mkdirSync('./DirectorioPlantillas', { recursive: true });
        }
        const pathToDocument = path.join("./DirectorioPlantillas" ,  documento.nombreArchivo );
        const leerArchivo = fs.readFileSync( pathToDocument , "binary" ) ; 
        const zip = new PizZip(leerArchivo) ; 
        const doc = new Docxtemplater( zip,{
          paragraphLoop: true,
          linebreaks: true,
        } );
        doc.render( documento.renderData ) ;
        const buf = doc.getZip().generate({
          type: "nodebuffer",
          compression: "DEFLATE",
        });
        const plantilla = await this.plantillaRepository.findOne( { where: { Route: pathToDocument } } ) ;
        const currentTime = new Date() ;
        const formatedCurrentTime = currentTime.toISOString() ;
        const serverPath = path.join( './DirectorioUsuarios' , documento.NombreUsuario , 'Documentos' );
        if (!fs.existsSync(serverPath)) {
          fs.mkdirSync(serverPath, { recursive: true });
        }
        const split = documento.nombreDocumento.split('.') ;
        const nombreDocumento = split[0]; 
        const routeDocumento = path.join(serverPath, `${nombreDocumento}.docx`) ;
        fs.writeFileSync( routeDocumento , buf);
        const registroDocumento = {
          Nombre: documento.nombreDocumento,
          FechaModificacion: formatedCurrentTime , 
          nombrePlantilla: plantilla.Nombre , 
          idUsuario: documento.idUsuario, 
          Route: routeDocumento 
        } ;
        const createRegistroDocumento = this.documentosRepository.create( registroDocumento ) ;
        const registrarDocumento = await this.documentosRepository.save( createRegistroDocumento ) ;
        return buf ;
    }
    catch( e ){
      console.log( e ) ;
    }
  }

  async uploadDocument( documento: Express.Multer.File , idUsuario: number ) {//subir documento
    const InspectModule = require("docxtemplater/js/inspect-module.js");
    const iModule = InspectModule();
    const pathToDocument = path.resolve(documento.path);
    const leerArchivo = fs.readFileSync(pathToDocument, 'binary');
    const zip = new PizZip( leerArchivo );
    const doc = new Docxtemplater(zip, { modules: [iModule] });
    const tags = iModule.getAllTags();
    const splitNombreArchivo = documento.filename.split('.') ;
    const nombreArchivo = splitNombreArchivo[0] ;
    const currentTime = new Date() ;
    const formatedCurrentTime = currentTime.toISOString() ;
    const plantilla = {
      Nombre: nombreArchivo, 
      FechaModificacion: formatedCurrentTime, 
      Route: documento.path, 
      idUsuario: idUsuario
    };
    const registrarPlantilla =  this.plantillaRepository.create( plantilla ) ;
    const plantillaRegistrada = await this.plantillaRepository.save( registrarPlantilla ) ;
    return tags ; 
  }


  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosRepository.update( { idDocumento: id } , updateDocumentoDto );
  }

  async remove(id: number) {
    const documento = await this.documentosRepository.findOneBy({ idDocumento: id }) ;
    if (!fs.existsSync(documento.Route)) {
      return null ;
    }
    fs.unlinkSync( documento.Route ) ;
    return this.documentosRepository.delete( id );
  }

  async findUserDocumentos( idUsuario: number , options: IPaginationOptions ): Promise<Pagination<Documentos>> {
    const documentos = this.documentosRepository
      .createQueryBuilder('documentos')
      .select([ 'documentos.idDocumento','documentos.Nombre' , 'documentos.FechaModificacion' ])
      .where('documentos.idUsuario = :idUsuario' , { idUsuario } )

      return paginate<Documentos>( documentos, options ) ; 
  }

  async pageCount( idUsuario: number ){
    const result = await this.documentosRepository.count( { where: { idUsuario: idUsuario } } ) ;
    let division = result / 3 ;
    let decimal = ( division % 1 ) * 10 ;
    let pageCount = Math.round( result / 3 ) ; 
    if( decimal === 0 )
      pageCount = pageCount ;
    else if( decimal < 5 )
      pageCount = pageCount + 1;
    else  
      pageCount = pageCount ;
    return pageCount
  }
}
