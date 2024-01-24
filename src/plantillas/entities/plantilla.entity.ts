import { Documentos } from "src/documentos/entities/documento.entity";
import { Usuarios } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plantilla {
    @PrimaryGeneratedColumn()
    idPlantilla: number; 

    @Column('varchar')
    Nombre: string; 

    @Column({ type: 'datetime' })
    FechaModificacion: string; 

    @Column( 'varchar' , { nullable: true  } )
    Route: string ; 

    @Column( { nullable: false  } )
    idUsuario: number ; 

    @ManyToOne( () => Usuarios, ( usuario ) => usuario.plantilla )
    @JoinColumn( { name: "idUsuario" } )
    usuario: Usuarios; //Muchas plantillas pueden pertenecer a un solo departamento

    // @OneToMany( () => Documentos, ( documentos ) => documentos.plantilla , { cascade: true })
    // documentos: Documentos[] ; //Una plantilla puede corresponder a muchos documentos. 

}
