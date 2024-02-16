import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoEntity } from './documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoEntity])],
  providers: [DocumentoService],
  controllers: [DocumentoController]
})
export class DocumentoModule {}
