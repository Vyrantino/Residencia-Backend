import { Module } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { PlantillasController } from './plantillas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Plantilla  ]) ] , 
  controllers: [PlantillasController],
  providers: [PlantillasService],
})
export class PlantillasModule {}
