import { IsAlphanumeric, IsEmail , IsOptional, MaxLength , MinLength } from "class-validator";

export class LoginDto{

    @IsAlphanumeric()
    NombreUsuario: string ;

    @MinLength( 4 )
    @MaxLength( 16)
    Contraseña: string ; 
}