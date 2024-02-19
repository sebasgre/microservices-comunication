
import { DocumentoEntity } from 'src/documento/documento.entity';
import { NotificacionEntity } from 'src/notificaciones/notificaciones.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';



@Entity({ name: 'catalogo'})
export class CatalogoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaHora: Date;

    @Column()
    adminId: number;

    @Column({ default: false }) // Nuevo campo para indicar si el documento está deshabilitado
    deshabilitado: boolean;

    @ManyToMany(() => DocumentoEntity)
    @JoinTable({
        name: 'catalogo_documento',
        joinColumn: { name: 'catalogo_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'documento_id', referencedColumnName: 'id' }
    })
    documentos: DocumentoEntity[];

    // Definición de la relación muchos a muchos con NotificacionEntity
    @ManyToMany(() => NotificacionEntity)
    notificaciones: NotificacionEntity[];
}
