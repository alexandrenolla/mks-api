import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'movies' })
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    category: string;

    @Column({ nullable: false })
    description: string;

    @Column({ type: 'date', nullable: false }) // Tipo 'date' para guardar somente data.
    date: Date;

    // Para receber URLS dos trailers.
    @Column({ nullable: true })
    trailer: string;

}