import { Plantilla } from "src/plantillas/entities/plantilla.entity";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Documentos {
    @PrimaryGeneratedColumn()
    idDocumento: number ; 

    @Column('varchar')
    Nombre: string ; 

    @Column({type: 'datetime'} )
    FechaModificacion: string ; 

    @Column()
    nombrePlantilla: string ;

    @Column()
    idUsuario: number ;

    @Column()
    Route: string; 
    
    @ManyToOne( () => Usuarios , ( usuario ) => usuario.documentos )
    @JoinColumn( { name: "idUsuario" } )
    usuario: Usuarios ; 
    // @ManyToOne( () => Plantilla , ( plantilla ) => plantilla.documentos )
    // @JoinColumn( { name: "idPlantilla" } )
    // plantilla: Plantilla[] ; 


}
