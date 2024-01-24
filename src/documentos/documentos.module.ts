import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from 'src/plantillas/entities/plantilla.entity';
import { Documentos } from './entities/documento.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([ Documentos  , Plantilla  ]) ] ,
  controllers: [DocumentosController],
  providers: [DocumentosService],
  
})
export class DocumentosModule {}
