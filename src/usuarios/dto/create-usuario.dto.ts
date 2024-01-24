import { MinLength , MaxLength , IsEmail , IsAlphanumeric} from "class-validator";

export class CreateUsuarioDto {
    @MinLength( 4 )
    @MaxLength( 16 )
    @IsAlphanumeric()
    NombreUsuario: string ; 

    @MinLength( 4 )
    @MaxLength( 16 )
    Contraseña: string ; 
    
    Rol: string ; 

}
