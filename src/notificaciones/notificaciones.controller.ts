import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionEntity } from './notificaciones.entity';


@Controller('notificaciones')
export class NotificacionesController {
  constructor(private notificacionService: NotificacionesService) {}

  @Post()
  createNotificacion(@Body() notificacion: NotificacionEntity) {
    return this.notificacionService.createNotificacion(notificacion);
  }

  @Get()
  getNotificaciones() {
    return this.notificacionService.getNotificaciones();
  }

  @Get(':id')
  getNotificacion(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionService.getNotificacion(id);
  }

  @Delete(':id')
  deleteNotificacion(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionService.deleteNotificacion(id);
  }

 @Patch(':notificacionId/addNotificacion/:catalogoId')
    addNotificacionesToCatalogo(
        @Param('notificacionId', ParseIntPipe) notificacionId: number,
        @Param('catalogoId', ParseIntPipe) catalogoId: number,
    ) {
        return this.notificacionService.addNotificacionesToCatalogo(notificacionId, catalogoId);
    }

  @Patch(':notificacionId/removeCatalogo/:catalogoId')
  removeCatalogoFromNotificacion(
    @Param('notificacionId', ParseIntPipe) notificacionid: number,
    @Param('catalogoId', ParseIntPipe) catalogoId: number,
  ) {
    return this.notificacionService.removeNotificacionToCatalogo(notificacionid, catalogoId);
  }

    @Patch(':id/disable')
    disableNotificacion(@Param('id', ParseIntPipe) id: number) {
      return this.notificacionService.disableNotificacion(id);
    }

    @Get(':id/catalogo')
  getNotificacionesByCatalogo(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionService.getNotificacionesByCatalogo(id);
  }
}
