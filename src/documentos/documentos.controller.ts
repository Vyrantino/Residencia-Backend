import { Controller, Get, Post, Body, Patch, Param, Delete , Res , ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, Query, DefaultValuePipe} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Response } from 'express';
import * as fs from 'fs' ;
import * as path from 'path' ;
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetDocumentoDto } from './dto/get-documento.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Documentos } from './entities/documento.entity';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get('pagecount/:idUsuario')
  getPages( @Param( 'idUsuario' , ParseIntPipe ) idUsuario: number ){
    return this.documentosService.pageCount( idUsuario ) ;
  }

  @Get(':id')
  async retrieveDocument( @Param('id' , ParseIntPipe ) idDocumento: number , @Res() res: Response ){
    const result = await this.documentosService.retrieveDocument( idDocumento ) ;
    if (!result) {
      // Maneja el caso de que el documento no exista según tus necesidades
      return res.status(404).send('Documento no encontrado');
    }
    res.setHeader( 'Content-Type' , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ) ; 
    res.setHeader( 'Content-Disposition' , `attachment; filename=${ result.nombre }` ) ;
    res.send( result.buffer );  
  }

  @Post('download')
  async download(@Body() getDocumento: GetDocumentoDto , @Res() res: Response ) {
    const buf = await this.documentosService.download(getDocumento);
    res.setHeader( 'Content-Type' , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ) ; 
    res.setHeader( 'Content-Disposition' , `attachment; filename=${ getDocumento.nombreDocumento }` ) ;
    res.send( buf );  
  }


  // @Get('idUsuario/:id')
  // async getUserDocumentos( @Param('id' , ParseIntPipe ) idUsuario: number ) {
  //   return this.documentosService.findUserDocumentos(  idUsuario );
  // }
  @Get('idUsuario/:id')
  async getUserDocumentos(
    @Param('id', ParseIntPipe) idUsuario: number ,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 3,
   ): Promise<Pagination<Documentos>> {
    limit = limit > 100 ? 100 : limit ; 
    return this.documentosService.findUserDocumentos(  idUsuario  , {
      page, 
      limit, 
    });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentosService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors( FileInterceptor( 'documento' ,  {
     storage: diskStorage({
        destination: function( req , file, cb  ){
        const usuario = req.body.usuario || ''; 
        const baseDirectory = './DirectorioPlantillas';
        const directoryPath = path.join(baseDirectory);
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }
          cb( null, directoryPath )

        },
        filename: function( res, file, cb ){
        
          cb( null , file.originalname )

        },
     }) 
  })) 
  async uploadFile( 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(doc|docx|)' }),

        ],
      }),
    ) 
    file: Express.Multer.File ,
    @Body('idUsuario') idUsuario: number,
  ){
    try{
      return this.documentosService.uploadDocument( file , idUsuario ) ;
    }
    catch( error ){
      console.error( error ) ;
      console.log('ocurrio un error!') ;
    }
  }
  
 
}
