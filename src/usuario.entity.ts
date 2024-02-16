import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' }) // Asegúrate de que el nombre coincida con el de la tabla en PostgreSQL
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    username: string;
}
