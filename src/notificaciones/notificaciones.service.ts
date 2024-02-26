import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacionEntity } from './notificaciones.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { DocumentoEntity } from 'src/documento/documento.entity';

interface NotificacionData {
  catalogoId: number;
  documentoId: number;
  // Add other properties of notificacion here
}
@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(NotificacionEntity)
    private notificacionRepository: Repository<NotificacionEntity>,
    @InjectRepository(CatalogoEntity)
    private catalogoRepository: Repository<CatalogoEntity>,
    @InjectRepository(DocumentoEntity)
    private documentoRepository: Repository<DocumentoEntity>,
  ) {}


  
  async createNotificacionWithCatalogoAndDocument(notificacionData: NotificacionData) {
    const { catalogoId, documentoId, ...notificacionDetails } = notificacionData;
  
    // Crear la notificación
    const nuevaNotificacion = await this.notificacionRepository.save(notificacionDetails);
  
    // Obtener el catálogo asociado
    const catalogo = await this.catalogoRepository.findOne({ where: { id: catalogoId }, relations: ['documentos'] });
    if (!catalogo) {
      throw new Error('El catálogo especificado no existe');
    }
  
    // Verificar que el documento existe en el catálogo
    const documento = catalogo.documentos.find((doc) => doc.id === documentoId);
    if (!documento) {
      throw new Error('El documento especificado no existe en el catálogo');
    }
  
    // Asociar el documento al catálogo
    catalogo.documentos = [documento];
  
    // Guardar el catálogo actualizado
    await this.catalogoRepository.save(catalogo);
  
    // Asociar la notificación con el catálogo y el documento específico
    nuevaNotificacion.catalogos = [catalogo];
  
    // Guardar la notificación actualizada
    await this.notificacionRepository.save(nuevaNotificacion);
  
    return nuevaNotificacion;
  }


  async countNotificacionesByUsuario(usuarioId: number): Promise<number> {
    return this.notificacionRepository.count({ where: { usuarioId } });
  }

  async getNotificacionesWithCatalogoAndDocuments() {
    const notificaciones = await this.notificacionRepository.createQueryBuilder('notificacion')
      .leftJoinAndSelect('notificacion.catalogos', 'catalogo')
      .leftJoinAndSelect('catalogo.documentos', 'documento')
      .select(['notificacion', 'catalogo', 'documento'])
      .getMany();

    return notificaciones;
  }

 async getNotificacion(id: number) {
    const notificacion = await this.notificacionRepository.createQueryBuilder('notificacion')
      .leftJoinAndSelect('notificacion.catalogos', 'catalogo')
      .leftJoinAndSelect('catalogo.documentos', 'documento')
      .select(['notificacion', 'catalogo', 'documento'])
      .where('notificacion.id = :id', { id: id })
      .getOne();

    return notificacion;
  }

  createNotificacion(notificacion: NotificacionEntity) {
    return this.notificacionRepository.save(notificacion);
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

    async enableNotificacion(id: number) {
        const notificacion = await this.notificacionRepository.findOne({
        where: { id: id },
        });
    
        if (!notificacion) {
        throw new Error('La notificación no existe');
        }
    
        notificacion.deshabilitado = false;
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

      async getNotificacionesByUsuario(usuarioId: number) {
        const notificaciones = await this.notificacionRepository.createQueryBuilder('notificacion')
          .innerJoinAndSelect('notificacion.catalogos', 'catalogo') // Incluimos el catálogo y sus documentos
          .innerJoinAndSelect('catalogo.documentos', 'documento')
          .where('notificacion.usuarioId = :usuarioId', { usuarioId })
          .getMany();
        return notificaciones;
      }

}
