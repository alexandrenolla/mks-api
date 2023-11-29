import { IsDateString, IsUrl, Length, IsOptional } from 'class-validator';

export class UpdateMovieDto {
    @IsOptional()
    @Length(1, 255)
    title?: string;

    @IsOptional()
    @Length(1, 255)
    category?: string;

    @IsOptional()
    @Length(1, 255)
    description?: string;

    @IsOptional()
    @IsDateString()
    date?: Date;

    @IsOptional()
    @Length(1, 255)
    @IsUrl({ require_protocol: true })
    trailer?: string;
}
