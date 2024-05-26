import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignIN } from 'src/users/dto/signIn-user.dto';
import { Users } from 'src/users/secama/Model.Users';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<Users>;
    login(signInDto: SignIN): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    verifyUser(verifyUserDto: CreateAuthDto): Promise<Users>;
}
