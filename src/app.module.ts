import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentoModule } from './documento/documento.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', // root
    password: 'root', // root
    database: 'notifications', // notificaciones
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),DocumentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
