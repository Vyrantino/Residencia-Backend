import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstant } from "./jwt.constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Usuarios ]), 
    JwtModule.register({
      secret: jwtConstant.secret , 
      signOptions: { expiresIn: '60s' },
    })
   ] , 
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
