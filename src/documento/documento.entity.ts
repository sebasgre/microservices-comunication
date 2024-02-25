import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { DocumentoTipo } from './documento.enum';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';

@Entity({ name: 'documento'})
export class DocumentoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    mensaje: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaHora: Date;

    @Column({
        type: 'enum',
        enum: DocumentoTipo,
        default: DocumentoTipo.Tipo1
    })
    tipoDoc: DocumentoTipo;

    @Column()
    adminId: number;

    @Column({ default: false }) // Nuevo campo para indicar si el documento está deshabilitado
    deshabilitado: boolean;

    @ManyToMany(() => CatalogoEntity)
    catalogos: CatalogoEntity[];
}
