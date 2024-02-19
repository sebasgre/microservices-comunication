import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoEntity } from './documento.entity';

@Controller('documento')
export class DocumentoController {
  constructor(private documentService: DocumentoService) {}

  @Post()
  createDocument(@Body() document: DocumentoEntity) {
    return this.documentService.createDocument(document);
  }

  @Get()
  getDocuments() {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  getDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.getDocument(id);
  }

  @Delete(':id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.deleteDocument(id);
  }

  @Patch(':id')
  updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() document: DocumentoEntity,
  ) {
    return this.documentService.updateDocument(document, id);
  }

  // Nueva ruta para obtener documentos por catálogo
  // @Get('catalogo/:catalogId')
  // getDocumentsByCatalog(@Param('catalogId', ParseIntPipe) catalogId: number) {
  //   return this.documentService.getDocumentsByCatalog(catalogId);
  // }

  @Patch(':id/disable')
  disableDocument(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.disableDocument(id);
  }
}
