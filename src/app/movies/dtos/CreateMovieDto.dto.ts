import { IsDateString, IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @Length(1, 255)
    title: string;

    @IsNotEmpty()
    @Length(1, 255)
    category: string;

    @IsNotEmpty()
    @Length(1, 255)
    description: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @Length(1, 255)
    @IsUrl({ require_protocol: true })
    trailer: string;
}