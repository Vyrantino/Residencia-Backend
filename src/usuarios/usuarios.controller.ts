import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  registerUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    console.log( { body: createUsuarioDto } ) ;
    return this.usuariosService.register( createUsuarioDto );
  } 

  @Post('login')
  loginUser( @Body() user: LoginDto ){
    return this.usuariosService.login( user ) ;
  }

  @Get('master')
  findAll() {
    return this.usuariosService.findAll();
  }


  @Get(':id')
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe ) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe ) id: number) {
    return this.usuariosService.remove(+id);
  }
}

