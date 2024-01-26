import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PlantillasModule } from './plantillas/plantillas.module';
import { DocumentosModule } from './documentos/documentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios/entities/usuario.entity';
import { Plantilla } from './plantillas/entities/plantilla.entity';
import { Documentos } from './documentos/entities/documento.entity';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'SCGGOCCITD/'),
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'oficios',
      password: '$password',
      database: 'oficios', 
      entities: [
        Usuarios,
        Plantilla,
        Documentos,
        HttpModule
      ],
      synchronize: true,
    }),
    UsuariosModule, PlantillasModule, DocumentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
