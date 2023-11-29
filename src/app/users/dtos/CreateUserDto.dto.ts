import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @Length(1, 255)
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
}