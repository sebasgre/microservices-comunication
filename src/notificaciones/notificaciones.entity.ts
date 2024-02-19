import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';


@Entity({ name: 'notificaciones' })
export class NotificacionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechaHora: Date;

    @Column()
    usuarioId: number;

    @Column({ default: false }) // Nuevo campo para indicar si el documento está deshabilitado
    deshabilitado: boolean;

    // Definición de la relación muchos a muchos con CatalogoEntity
    @ManyToMany(() => CatalogoEntity)
    @JoinTable({
        name: 'notificaciones_catalogo',
        joinColumn: { name: 'notificacionId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'catalogoId', referencedColumnName: 'id' }
    })
    catalogos: CatalogoEntity[];
}
