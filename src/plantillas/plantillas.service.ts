import { Injectable } from '@nestjs/common';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs' ;
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as path from 'path' ;
import { IPaginationOptions, Pagination, paginate, paginateRaw } from 'nestjs-typeorm-paginate';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");


@Injectable()
export class PlantillasService {
  constructor(
    @InjectRepository( Plantilla )
    private plantillaRepository: Repository< Plantilla > ,
  ){}

  async create(plantilla: CreatePlantillaDto) {

    const doc = new Document({
      sections: [
          {
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                          new TextRun(" Instituto Tecnologico {Nombre} {Apellido} {CURP}"),
                          new TextRun({
                              text: ""+plantilla.Nombre+"",
                              bold: true,
                          }),
                      ],
                  }),
              ],
          },
      ],
  });
  // const departamento = await this.departamentosRepository.findOneBy( { idDepartamento: plantilla.idDepartamento } ) ;
  // const documentPath = path.join( "./DirectorioDepartamentos" , departamento.Nombre , ""+plantilla.Nombre+".docx" ) ;
  // Packer.toBuffer(doc).then((buffer) => { 
  //   fs.writeFileSync( documentPath, buffer);
  // });
  
    const currentTime = new Date() ;
    const formatedCurrentTime = currentTime.toISOString() ;
    plantilla.FechaModificacion = formatedCurrentTime ; 
    // plantilla.Route = documentPath ;
    const newPlantilla = this.plantillaRepository.create( plantilla ) ;
    return this.plantillaRepository.save( newPlantilla );
  }

  findAll(): Promise< Plantilla[] > {
    return this.plantillaRepository.find({
      relations:{
        usuario: true
      }
    });
  }

  findAllPaginated( options: IPaginationOptions ): Promise< Pagination<Plantilla> > {
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

    return paginate<Plantilla>( plantillas , options ) ;
  }

  async findOne(id: number): Promise < Plantilla | null > {
    const InspectModule = require("docxtemplater/js/inspect-module.js");
    const iModule = InspectModule();
    const plantilla = await this.plantillaRepository.findOne( { where: { idPlantilla: id } } ) ; 
    const pathToDocument = path.resolve(plantilla.Route);
    const leerArchivo = fs.readFileSync(pathToDocument, 'binary');
    const zip = new PizZip( leerArchivo ) ;
    const doc = new Docxtemplater(zip, { modules: [iModule] });
    const tags = iModule.getAllTags() ;
    return tags ; 
  }

  findBy( idUsuario: number ): Promise < Plantilla[] | null >{
    return this.plantillaRepository.find( { 
      select: { 
        idPlantilla: true ,  
        idUsuario: true , 
        Nombre: true  
      } , 
      relations:{
        usuario: true
      } ,
      where: {
        idUsuario: idUsuario 
      }
    } ) ;
  }

  update(id: number, updatePlantillaDto: UpdatePlantillaDto) {
    const splitRoute = updatePlantillaDto.Route.split("/") ;
    const popOldName = splitRoute.pop() ;
    splitRoute.push( updatePlantillaDto.Nombre ) ;
    const newRoute = splitRoute.join( '/' );
    updatePlantillaDto.Route = newRoute ; 
    return this.plantillaRepository.update( { idPlantilla: id } , updatePlantillaDto );
  }

  async remove(id: number) {
   try {
      const plantilla = await this.plantillaRepository.findOneBy( { idPlantilla: id } ) ;
      if( !fs.existsSync( plantilla.Route ) ){
        return null ;
      }
      fs.unlinkSync( plantilla.Route ) ;
      return this.plantillaRepository.delete( id );
   } catch (error) {
    
   }
  }

  async pageCount(  ){
    const result = await this.plantillaRepository.count( ) ;
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
