import { User } from '../user.entity';

export class UserDto {

    name: string;
    email: string;

    constructor(user: User) {
        this.name = user.name;
        this.email = user.email;
    }
}


