import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentoModule } from './documento/documento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoModule } from './catalogo/catalogo.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { NoticoModule } from './notico/notico.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'notifications',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DocumentoModule,
    CatalogoModule,
    NotificacionesModule,
    NoticoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}