import { Documentos } from "src/documentos/entities/documento.entity";
import { Plantilla } from "src/plantillas/entities/plantilla.entity";
export declare class Usuarios {
    idUsuario: number;
    NombreUsuario: string;
    Contraseña: string;
    Rol: string;
    documentos: Documentos[];
    plantilla: Plantilla[];
}
