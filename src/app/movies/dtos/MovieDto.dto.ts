import { Movie } from "../movie.entity";

export class MovieDto {
    title: string;
    category: string;
    description: string;
    date: Date;
    trailer: string;

    constructor(movie: Movie) {
        this.title = movie.title;
        this.category = movie.category;
        this.description = movie.description;
        this.date = movie.date;
        this.trailer = movie.trailer;
    }
}
