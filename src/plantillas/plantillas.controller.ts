import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Plantilla } from './entities/plantilla.entity';

@Controller('plantillas')
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Post()
  create(@Body() createPlantillaDto: CreatePlantillaDto) {
    return this.plantillasService.create(createPlantillaDto);
  }

  @Get('pagecount')
  getPages(){
    return this.plantillasService.pageCount( ) ;
  }

  @Get('paginated')
  paginatedPlantillas(
    @Query('page', new DefaultValuePipe(1) , ParseIntPipe ) page: number = 1,
    @Query( 'limit' , new DefaultValuePipe(3) , ParseIntPipe ) limit: number = 3,
  ): Promise < Pagination< Plantilla > > {
    limit = limit > 100 ? 100 : limit ; 
    return this.plantillasService.findAllPaginated({
      page,
      limit,
    }) ;
  }

  @Get()
  findAll() {
    return this.plantillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.plantillasService.findOne(+id);
  }

  @Get( 'idUsuario/:idUsuario' ) 
  findBy( @Param( 'idUsuario' , ParseIntPipe ) idUsuario: number ){
    return this.plantillasService.findBy( idUsuario ) ; 
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe ) id: number, @Body() updatePlantillaDto: UpdatePlantillaDto) {
    return this.plantillasService.update(+id, updatePlantillaDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe ) id: number ) {
    return this.plantillasService.remove(id);
  }


}
