import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash , compare } from 'bcrypt' ; 
import { LoginDto } from './dto/login.dto';
 
@Injectable()
export class UsuariosService {
  constructor( 
    @InjectRepository( Usuarios )
    private usuariosRepository: Repository< Usuarios >,
    private jwtService: JwtService ,
   ){}

  async register(usuario: CreateUsuarioDto) {
    const { Contraseña } = usuario ; 
    const plainToHash = await hash( Contraseña , 10 ) ; 
    usuario = { ...usuario , Contraseña: plainToHash } ;
    const newUsuario = this.usuariosRepository.create( usuario ) ; 
    return this.usuariosRepository.save( newUsuario ) ;
  }

  async login( usuario: LoginDto ){
    const {  NombreUsuario , Contraseña } = usuario ; 
    const findUser = await this.usuariosRepository.findOne( { where: { NombreUsuario } } );
    if( !findUser ) throw new HttpException( 'Usuario no se encontró' , 404 ) ;
    const checkPassword = await compare( Contraseña, findUser.Contraseña );
    if( !checkPassword ) throw new HttpException( 'Contraseña Incorrecta ' , 403 ) ;
    const payload = { idUsuario: findUser.idUsuario , NombreUsuario: findUser.NombreUsuario } ; 
    const token = this.jwtService.sign( payload );
    const data = { 
      idUsuario: findUser.idUsuario, 
      NombreUsuario: findUser.NombreUsuario , 
      Rol: findUser.Rol , 
      token: token 
    }
    
    return data ;  
  }

  findAll(): Promise < Usuarios[] > {
    return this.usuariosRepository.find( { where: { Rol: 'Usuario' } } );
  }

  findAllMaster(): Promise < Usuarios[] > {
    return this.usuariosRepository.find( );
  }

  findOne(id: number): Promise< Usuarios | null > {
    return this.usuariosRepository.findOneBy( { idUsuario: id } );
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try{
      if( updateUsuarioDto.Contraseña ){
        const { Contraseña } = updateUsuarioDto ; 
        const plainToHash = await hash( Contraseña , 10 ) ; 
        updateUsuarioDto = { ...updateUsuarioDto , Contraseña: plainToHash } ;
        return this.usuariosRepository.update( { idUsuario: id } , updateUsuarioDto );
      }
      else{
        return this.usuariosRepository.update( { idUsuario: id } , updateUsuarioDto );
      }
    }
    catch( error ){
      console.error( error );
    }
  }

  remove(id: number) {
    return this.usuariosRepository.delete(id);
  }
}
