import { IsEmail, Length } from "class-validator";

export class UpdateUserDto {

    @Length(1, 255)
    name: string;
    
    @IsEmail()
    email: string;
}