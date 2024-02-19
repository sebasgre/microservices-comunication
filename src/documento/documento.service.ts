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

createDocument(document: DocumentoEntity) {
  return this.documentoRepository.save(document);
}

getDocuments() {
  return this.documentoRepository.find();
}

getDocument(id: number) {
  return this.documentoRepository.findOne({
    where: {id:id}
  });
}

deleteDocument(id: number) {
  return this.documentoRepository.delete({ id: id });
}

updateDocument(document: DocumentoEntity, id: number) {
    return this.documentoRepository.update({ id: id }, document);
}

async disableDocument(id: number) {
  const documento = await this.documentoRepository.findOne({where: {id:id}});
  if (!documento) {
    throw new Error(`Documento con id ${id} no encontrado`);
  }
  documento.deshabilitado = true;
  return this.documentoRepository.save(documento);
}

// getDocumentsByCatalog(catalogId: number) {
//   return this.documentoRepository.find({
//     where: {
//       catalogos: { id: catalogId } // Utiliza la relación catalogo y su propiedad id
//     }
//   });
// }



}
