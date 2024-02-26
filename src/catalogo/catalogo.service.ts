import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoEntity } from './catalogo.entity';
import { DocumentoEntity } from 'src/documento/documento.entity';


@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(CatalogoEntity)
    private catalogoRepository: Repository<CatalogoEntity>,
    @InjectRepository(DocumentoEntity)
    private documentoRepository: Repository<DocumentoEntity>,
) { }

async createCatalogo(catalogo: CatalogoEntity) {
  const newCatalogo = await this.catalogoRepository.save(catalogo);
  return this.catalogoRepository.findOne({where: {id: newCatalogo.id}});
}

getCatalogos() {
  return this.catalogoRepository.find();
}

getCatalogo(id: number) {
  return this.catalogoRepository.findOne({
    where: {id:id}
  });
}

deleteCatalogo(id: number) {
  return this.catalogoRepository.delete({ id: id });
}

async updateCatalogo(catalogo: CatalogoEntity, id: number) {
    await this.catalogoRepository.update({ id: id }, catalogo);
    return this.catalogoRepository.findOne({where: {id:id}});
}

async addDocumentToCatalogo(catalogoId: number, documentoId: number) {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id: catalogoId },
      relations: ['documentos']
    });
    const documento = await this.documentoRepository.findOne({
      where: { id: documentoId }
    });

    if (!catalogo || !documento) {
      throw new Error('El catálogo o el documento no existen');
    }

    catalogo.documentos.push(documento);
    await this.catalogoRepository.save(catalogo);
    return catalogo;
}

  async removeDocumentFromCatalogo(catalogoId: number, documentoId: number) {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id: catalogoId },
      relations: ['documentos']
    });
    const documento = await this.documentoRepository.findOne({
      where: { id: documentoId }
    });

    if (!catalogo || !documento) {
      throw new Error('El catálogo o el documento no existen');
    }

    catalogo.documentos = catalogo.documentos.filter(
      (documento) => documento.id !== documentoId
    );
    await this.catalogoRepository.save(catalogo);
    return catalogo;
  }
  
  async disableCatalogo(id: number) {
    const catalogo = await this.catalogoRepository.findOne({where: {id:id}});
    if (!catalogo) {
      throw new Error(`Catalogo con id ${id} no encontrado`);
    }
    catalogo.deshabilitado = true;
    return this.catalogoRepository.save(catalogo);
  }


  async enableCatalogo(id: number) {
    const catalogo = await this.catalogoRepository.findOne({where: {id:id}});
    if (!catalogo) {
      throw new Error(`Catalogo con id ${id} no encontrado`);
    }
    catalogo.deshabilitado = false;
    return this.catalogoRepository.save(catalogo);
  }

async getDocumentsByCatalog(id: number) {
    const catalogo = await this.catalogoRepository.findOne({
        where: { id: id },
        relations: ['documentos']
    });
    if (!catalogo) {
        throw new Error(`Catálogo con id ${id} no encontrado`);
    }
    return catalogo.documentos;

}

}
