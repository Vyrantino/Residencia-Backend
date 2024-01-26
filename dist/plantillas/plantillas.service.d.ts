import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { Plantilla } from './entities/plantilla.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class PlantillasService {
    private plantillaRepository;
    constructor(plantillaRepository: Repository<Plantilla>);
    create(plantilla: CreatePlantillaDto): Promise<Plantilla>;
    findAll(): Promise<Plantilla[]>;
    findAllPaginated(options: IPaginationOptions): Promise<Pagination<Plantilla>>;
    findOne(id: number): Promise<Plantilla | null>;
    findBy(idUsuario: number): Promise<Plantilla[] | null>;
    update(id: number, updatePlantillaDto: UpdatePlantillaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    pageCount(): Promise<number>;
}
