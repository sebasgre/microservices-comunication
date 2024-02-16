import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentoTipo } from './documento.enum';
import { UsuarioEntity } from 'src/usuario.entity';


@Entity({ name: 'documento'})
export class DocumentoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    mensaje: string;

    @Column()
    fechaHora: Date;

    @Column({
        type: 'enum',
        enum: DocumentoTipo,
        default: DocumentoTipo.Tipo1
    })
    tipoDoc: DocumentoTipo;

    @Column()
    adminId: number;

    
}
