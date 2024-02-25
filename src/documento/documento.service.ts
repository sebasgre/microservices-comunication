import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DocumentoEntity } from './documento.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(DocumentoEntity)
    private documentoRepository: Repository<DocumentoEntity>,
  ) { }

  async createDocument(document: DocumentoEntity) {
    const newDocument = await this.documentoRepository.save(document);
    // Recuperar el objeto completo de la base de datos
    return this.documentoRepository.findOne({ where: { id: newDocument.id } });
  }

  getDocuments() {
    return this.documentoRepository.find();
  }

  getDocument(id: number) {
    return this.documentoRepository.findOne({
      where: { id: id }
    });
  }

  deleteDocument(id: number) {
    return this.documentoRepository.delete({ id: id });
  }

  async updateDocument(document: DocumentoEntity, id: number) {
    await this.documentoRepository.update({ id: id }, document);
    // Recuperar el objeto actualizado de la base de datos
    return this.documentoRepository.findOne({ where: { id: id }});
  }

  async disableDocument(id: number) {
    const documento = await this.documentoRepository.findOne({ where: { id: id } });
    if (!documento) {
      throw new Error(`Documento con id ${id} no encontrado`);
    }
    documento.deshabilitado = true;
    return this.documentoRepository.save(documento);
  }
}
