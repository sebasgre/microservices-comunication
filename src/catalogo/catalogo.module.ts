import { Module } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEntity } from './catalogo.entity';
import { CatalogoController } from './catalogo.controller';
import { DocumentoEntity } from '../documento/documento.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CatalogoEntity, DocumentoEntity])],
  providers: [CatalogoService],
  controllers: [CatalogoController]
})
export class CatalogoModule {}
