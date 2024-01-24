import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType( CreateUsuarioDto ) {
    NombreUsuario?: string;
    Contraseña?: string;
    Rol?: string;
}
