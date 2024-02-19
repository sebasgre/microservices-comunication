import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacionEntity } from './notificaciones.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';


@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(NotificacionEntity)
    private notificacionRepository: Repository<NotificacionEntity>,
    @InjectRepository(CatalogoEntity)
    private catalogoRepository: Repository<CatalogoEntity>,
  ) {}

  createNotificacion(notificacion: NotificacionEntity) {
    return this.notificacionRepository.save(notificacion);
  }

  getNotificaciones() {
    return this.notificacionRepository.find();
  }

  getNotificacion(id: number) {
    return this.notificacionRepository.findOne({
      where: { id: id },
    });
  }

  deleteNotificacion(id: number) {
    return this.notificacionRepository.delete({ id: id });
  }

  async addNotificacionesToCatalogo(notificacionId: number, catalogoId: number) {
    const notificacion = await this.notificacionRepository.findOne({
      where: { id: notificacionId },
      relations: ['catalogos'],
    });
    const catalogo = await this.catalogoRepository.findOne({
      where: { id: catalogoId },
    });

    if (!notificacion || !catalogo) {
      throw new Error('La notificación o el catálogo no existen');
    }

    notificacion.catalogos.push(catalogo);
    await this.notificacionRepository.save(notificacion);
    return notificacion;
  }

  async removeNotificacionToCatalogo(notificacionId: number, catalogoId: number) {
    const notificacion = await this.notificacionRepository.findOne({
      where: { id: notificacionId },
      relations: ['catalogos'],
    });
    const catalogo = await this.catalogoRepository.findOne({
      where: { id: catalogoId },
    });

    if (!notificacion || !catalogo) {
      throw new Error('La notificación o el catálogo no existen');
    }

    notificacion.catalogos = notificacion.catalogos.filter(
      (catalogo) => catalogo.id !== catalogoId,
    );
    await this.notificacionRepository.save(notificacion);
    return notificacion;
  }

    async disableNotificacion(id: number) {
        const notificacion = await this.notificacionRepository.findOne({
        where: { id: id },
        });
    
        if (!notificacion) {
        throw new Error('La notificación no existe');
        }
    
        notificacion.deshabilitado = true;
        await this.notificacionRepository.save(notificacion);
        return notificacion;
    }

    async getNotificacionesByCatalogo(catalogoId: number) {
        const notificaciones = await this.notificacionRepository.createQueryBuilder('notificacion')
          .innerJoin('notificacion.catalogos', 'catalogo')
          .where('catalogo.id = :catalogoId', { catalogoId })
          .getMany();
        return notificaciones;
      }
}
