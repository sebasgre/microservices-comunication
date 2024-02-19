import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CatalogoEntity } from './catalogo.entity';


@Controller('catalogo')
export class CatalogoController {
  constructor(private catalogoService: CatalogoService) {}

  @Post()
  createCatalogo(@Body() catalogo: CatalogoEntity) {
    return this.catalogoService.createCatalogo(catalogo);
  }

  @Get()
  getCatalogos() {
    return this.catalogoService.getCatalogos();
  }

  @Get(':id')
  getCatalogo(@Param('id', ParseIntPipe) id: number) {
    return this.catalogoService.getCatalogo(id);
  }

  @Delete(':id')
  deleteCatalogo(@Param('id', ParseIntPipe) id: number) {
    return this.catalogoService.deleteCatalogo(id);
  }

  @Patch(':id')
  updateCatalogo(
    @Param('id', ParseIntPipe) id: number,
    @Body() catalogo: CatalogoEntity,
  ) {
    return this.catalogoService.updateCatalogo(catalogo, id);
  }

    @Patch(':catalogoId/add-documento/:documentoId')
    addDocumentToCatalogo(
      @Param('catalogoId', ParseIntPipe) catalogoId: number,
      @Param('documentoId', ParseIntPipe) documentoId: number,
    ) {
      return this.catalogoService.addDocumentToCatalogo(catalogoId, documentoId);
    }

    @Patch(':catalogoId/remove-documento/:documentoId')
    removeDocumentFromCatalogo(
      @Param('catalogoId', ParseIntPipe) catalogoId: number,
      @Param('documentoId', ParseIntPipe) documentoId: number,
    ) {
      return this.catalogoService.removeDocumentFromCatalogo(catalogoId, documentoId);
    }

    @Patch(':id/disable')
    disableCatalogo(@Param('id', ParseIntPipe) id: number) {
      return this.catalogoService.disableCatalogo(id);
    }

    @Get(':id/documentos')
    getDocumentosByCatalogo(@Param('id', ParseIntPipe) id: number) {
      return this.catalogoService.getDocumentsByCatalog(id);
    }

  
}
