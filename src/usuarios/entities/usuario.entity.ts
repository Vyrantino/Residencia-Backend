import { IsAlphanumeric } from "class-validator";
import { Documentos } from "src/documentos/entities/documento.entity";
import { Plantilla } from "src/plantillas/entities/plantilla.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique([ 'NombreUsuario' ])
export class Usuarios {

    @PrimaryGeneratedColumn()
    idUsuario: number; 

    @Column('varchar', { length: 16 })
    @IsAlphanumeric()
    NombreUsuario: string ; 

    @Column('varchar')
    Contraseña: string ;

    @Column('varchar' , { default: 'Usuario' })
    Rol: string ; 

    @OneToMany( () => Documentos , ( documentos ) => documentos.usuario , { cascade: true })
    documentos: Documentos[] ; //Cada usuario tendra varios documentos

    @OneToMany( () => Plantilla , ( plantilla ) => plantilla.usuario , { cascade: true })
    plantilla: Plantilla[] ; //Cada usuario tendra varios documentos
    
}
