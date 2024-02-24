import { Module } from '@nestjs/common';
import { NotificacionesController } from './notificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionEntity } from './notificaciones.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { NotificacionesService } from './notificaciones.service';
import { DocumentoEntity } from 'src/documento/documento.entity';


@Module({
  imports: [TypeOrmModule.forFeature([NotificacionEntity, CatalogoEntity, DocumentoEntity])],
  providers: [NotificacionesService],
  controllers: [NotificacionesController]
})
export class NotificacionesModule {}
