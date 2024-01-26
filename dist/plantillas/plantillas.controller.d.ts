import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Plantilla } from './entities/plantilla.entity';
export declare class PlantillasController {
    private readonly plantillasService;
    constructor(plantillasService: PlantillasService);
    create(createPlantillaDto: CreatePlantillaDto): Promise<Plantilla>;
    getPages(): Promise<number>;
    paginatedPlantillas(page?: number, limit?: number): Promise<Pagination<Plantilla>>;
    findAll(): Promise<Plantilla[]>;
    findOne(id: number): Promise<Plantilla>;
    findBy(idUsuario: number): Promise<Plantilla[]>;
    update(id: number, updatePlantillaDto: UpdatePlantillaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
